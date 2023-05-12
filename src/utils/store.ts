import {EntityManager, FindOptionsWhere, In, FindOptionsRelations} from 'typeorm'
import assert from 'assert'
import {Entity as _Entity, EntityClass, FindManyOptions, FindOneOptions, Store} from '@subsquid/typeorm-store'
import {Graph} from 'graph-data-structure'
import {def} from '@subsquid/util-internal'
import {copy} from 'copy-anything'

export interface Entity extends _Entity {
    [k: string]: any
}

export type DeferData<E extends Entity> = {ids: Set<string>; relations: FindOptionsRelations<E>}
export type CacheMap<E extends Entity> = Map<string, Map<string, E | null>>

export class StoreWithCache {
    private em: EntityManager

    private deferMap: Map<string, DeferData<any>> = new Map()
    private cacheMap: CacheMap<any> = new Map()
    private classes: Map<string, EntityClass<any>> = new Map()

    private insertMap: Map<string, Map<string, Entity>> = new Map()
    private upsertMap: Map<string, Map<string, Entity>> = new Map()

    constructor(private store: Store) {
        this.em = (this.store as any).em()
    }

    async insert<E extends _Entity>(entity: E): Promise<void>
    async insert<E extends _Entity>(entities: E[]): Promise<void>
    async insert<E extends _Entity>(e: E | E[]): Promise<void> {
        const entities = Array.isArray(e) ? e : [e]
        if (entities.length == 0) return

        const entityName = entities[0].constructor.name
        const _insertList = this.getInsertList(entityName)
        const _upsertList = this.getUpsertList(entityName)
        const _cacheMap = this.getCacheMap(entityName)
        for (const entity of entities) {
            assert(!_insertList.has(entity.id))
            assert(!_upsertList.has(entity.id))

            let cached = _cacheMap.get(entity.id)
            assert(cached == null)

            cached = await this.cache(entity)
            _insertList.set(cached.id, cached)
        }
    }

    async upsert<E extends _Entity>(entity: E): Promise<void>
    async upsert<E extends _Entity>(entities: E[]): Promise<void>
    async upsert<E extends _Entity>(e: E | E[]): Promise<void> {
        const entities = Array.isArray(e) ? e : [e]
        if (entities.length == 0) return

        const entityName = entities[0].constructor.name
        const _insertList = this.getInsertList(entityName)
        const _upsertList = this.getUpsertList(entityName)
        for (const entity of entities) {
            const cached = await this.cache(entity)
            if (!_insertList.has(cached.id)) {
                _upsertList.set(cached.id, cached)
            }
        }
    }

    async save<E extends _Entity>(entity: E): Promise<void>
    async save<E extends _Entity>(entities: E[]): Promise<void>
    async save<E extends _Entity>(e: E | E[]): Promise<void> {
        return await this.upsert(e as any)
    }

    remove<E extends Entity>(entity: E): Promise<void>
    remove<E extends Entity>(entities: E[]): Promise<void>
    remove<E extends Entity>(entityClass: EntityClass<E>, id: string | string[]): Promise<void>
    async remove(entityClass: any, id?: any): Promise<void> {
        // await this.flush(entityClass)
        // await this.store.remove(entityClass, id)
        throw new Error('not implemented')
    }

    async count<E extends Entity>(entityClass: EntityClass<E>, options?: FindManyOptions<E>): Promise<number> {
        await this.flush(entityClass)
        return await this.store.count(entityClass, options)
    }

    async countBy<E extends Entity>(
        entityClass: EntityClass<E>,
        where: FindOptionsWhere<E> | FindOptionsWhere<E>[]
    ): Promise<number> {
        await this.flush(entityClass)
        return await this.store.countBy(entityClass, where)
    }

    async find<E extends Entity>(entityClass: EntityClass<E>, options?: FindManyOptions<E>): Promise<E[]> {
        await this.flush(entityClass)
        const _deferData = this.getDeferData(entityClass.name)
        options = options || {}
        options.relations =
            options.relations != null ? mergeRelataions(options.relations, _deferData.relations) : _deferData.relations
        const res = await this.store.find(entityClass, options)
        await this.cache(res)
        return res
    }

    async findBy<E extends Entity>(
        entityClass: EntityClass<E>,
        where: FindOptionsWhere<E> | FindOptionsWhere<E>[]
    ): Promise<E[]> {
        await this.flush(entityClass)
        const res = await this.store.findBy(entityClass, where)
        await this.cache(res)
        return res
    }

    async findOne<E extends Entity>(entityClass: EntityClass<E>, options: FindOneOptions<E>): Promise<E | undefined> {
        await this.flush(entityClass)
        const _deferData = this.getDeferData(entityClass.name)
        options.relations =
            options.relations != null ? mergeRelataions(options.relations, _deferData.relations) : _deferData.relations
        const res = await this.store.findOne(entityClass, options)
        if (res != null) await this.cache(res)
        return res
    }

    async findOneBy<E extends Entity>(
        entityClass: EntityClass<E>,
        where: FindOptionsWhere<E> | FindOptionsWhere<E>[]
    ): Promise<E | undefined> {
        await this.flush(entityClass)
        const res = await this.store.findOneBy(entityClass, where)
        if (res != null) await this.cache(res)
        return res
    }

    async findOneOrFail<E extends Entity>(entityClass: EntityClass<E>, options: FindOneOptions<E>): Promise<E> {
        return await this.findOne(entityClass, options).then(assertNotNull)
    }

    async findOneByOrFail<E extends Entity>(
        entityClass: EntityClass<E>,
        where: FindOptionsWhere<E> | FindOptionsWhere<E>[]
    ): Promise<E> {
        return await this.findOneBy(entityClass, where).then(assertNotNull)
    }

    async get<E extends Entity>(
        entityClass: EntityClass<E>,
        optionsOrId: string | FindOneOptions<E>
    ): Promise<E | undefined> {
        if (typeof optionsOrId === 'string') {
            await this.load(entityClass)
            const id = optionsOrId
            const _cacheMap = this.getCacheMap(entityClass.name)
            const entity = _cacheMap.get(id)
            if (entity !== undefined) {
                if (entity == null) return undefined

                return copy(entity) as E
            } else {
                await this.flush(entityClass)
                return await this.store.get(entityClass, id).then((v) => v && this.cache(v))
            }
        } else {
            await this.flush(entityClass)
            return await this.store.get(entityClass, optionsOrId).then((v) => v && this.cache(v))
        }
    }

    async getOrFail<E extends Entity>(
        entityClass: EntityClass<E>,
        optionsOrId: string | FindOneOptions<E>
    ): Promise<E> {
        return await this.get(entityClass, optionsOrId).then(assertNotNull)
    }

    defer<E extends Entity>(
        entityClass: EntityClass<E>,
        id: string,
        relations?: FindManyOptions<E>['relations']
    ): DeferredValue<E> {
        this.classes.set(entityClass.name, entityClass)

        const _deferredList = this.getDeferData(entityClass.name)
        _deferredList.ids.add(id)
        _deferredList.relations =
            relations != null ? mergeRelataions(_deferredList.relations, relations) : _deferredList.relations

        return new DeferredValue(this, entityClass, id)
    }

    async flush<E extends Entity>(entityClass?: EntityClass<E>): Promise<void> {
        const entityOrder = await this.getTopologicalOrder()

        for (const name of entityOrder) {
            const _insertList = this.getInsertList(name)
            if (_insertList.size > 0) {
                const entities = _insertList.values()
                await this.store.insert([...entities])
            }
            _insertList.clear()

            const _upsertList = this.getUpsertList(name)
            if (_upsertList.size > 0) {
                const entities = _upsertList.values()
                await this.store.upsert([...entities])
            }
            _upsertList.clear()

            if (entityClass && entityClass.name === name) break
        }
    }

    private async load<E extends Entity>(entityClass: EntityClass<E>): Promise<void> {
        const _deferData = this.getDeferData<E>(entityClass.name)
        if (_deferData.ids.size === 0) return

        const _cacheMap = this.getCacheMap(entityClass.name)
        for (const id of _deferData.ids) {
            if (_cacheMap.has(id)) continue
            _cacheMap.set(id, null)
        }

        await this.find<any>(entityClass, {where: {id: In([..._deferData.ids])}, relations: _deferData.relations})

        this.deferMap.delete(entityClass.name)
    }

    private cache<E extends Entity>(entity: E): Promise<E>
    private cache<E extends Entity>(entities: E[]): Promise<E[]>
    private async cache<E extends Entity>(e: E | E[]) {
        const entities = Array.isArray(e) ? e : [e]
        if (entities.length == 0) return

        const _cacheMap = this.getCacheMap(entities[0].constructor.name)
        const caachedEntities: Entity[] = []
        for (const entity of entities) {
            const constructor = entity.constructor as any
            const cached = _cacheMap.get(entity.id) || (new constructor() as Entity)

            const metadata = this.em.connection.entityMetadatasMap.get(entity.constructor)
            assert(metadata != null, `Missing metadata for ${entity.constructor.name}`)
            for (const column of metadata.columns) {
                const propertyName = column.propertyName
                if (column.relationMetadata) {
                    const relationMetadata = column.relationMetadata
                    const relationPropertyName = relationMetadata.propertyName
                    if (relationPropertyName in entity) {
                        assert(!relationMetadata.isOneToMany, `OneToMany relations can't be cached`)
                        cached[relationPropertyName] =
                            entity[relationPropertyName] == null
                                ? undefined
                                : await this.cache(entity[relationPropertyName])
                    }

                    if (propertyName != relationPropertyName) {
                        cached[propertyName] = entity[propertyName]
                    }
                } else {
                    cached[propertyName] = entity[propertyName]
                }
            }

            _cacheMap.set(cached.id, cached)
            caachedEntities.push(cached)
        }

        return Array.isArray(e) ? caachedEntities : caachedEntities[0]
    }

    @def
    private async getTopologicalOrder() {
        const graph = Graph()
        for (const metadata of this.em.connection.entityMetadatas) {
            graph.addNode(metadata.name)
            for (const foreignKey of metadata.foreignKeys) {
                graph.addEdge(metadata.name, foreignKey.referencedEntityMetadata.name)
            }
        }
        return graph.topologicalSort().reverse()
    }

    private getDeferData<E extends Entity>(name: string): DeferData<E> {
        let list = this.deferMap.get(name)
        if (list == null) {
            list = {ids: new Set(), relations: {}}
            this.deferMap.set(name, list)
        }

        return list
    }

    private getCacheMap<E extends Entity>(name: string): Map<string, E | null> {
        let map = this.cacheMap.get(name)
        if (map == null) {
            map = new Map()
            this.cacheMap.set(name, map)
        }

        return map
    }

    private getInsertList(name: string): Map<string, Entity> {
        let list = this.insertMap.get(name)
        if (list == null) {
            list = new Map()
            this.insertMap.set(name, list)
        }

        return list
    }

    private getUpsertList(name: string): Map<string, Entity> {
        let list = this.upsertMap.get(name)
        if (list == null) {
            list = new Map()
            this.upsertMap.set(name, list)
        }

        return list
    }
}

function assertNotNull<T>(val: T | null | undefined): T {
    assert(val != null)
    return val
}

function mergeRelataions<E extends Entity>(
    a: FindOptionsRelations<E>,
    b: FindOptionsRelations<E>
): FindOptionsRelations<E> {
    const mergedObject: FindOptionsRelations<E> = {}

    for (const key in a) {
        mergedObject[key] = a[key]
    }

    for (const key in b) {
        const bValue = b[key]
        const value = mergedObject[key]
        if (typeof bValue === 'object') {
            mergedObject[key] = (typeof value === 'object' ? mergeRelataions(value, bValue) : bValue) as any
        } else {
            mergedObject[key] = value || bValue
        }
    }

    return mergedObject
}

export class DeferredValue<E extends Entity> {
    constructor(private store: StoreWithCache, private entityClass: EntityClass<E>, private id: string) {}

    @def
    async get(): Promise<E | undefined> {
        return await this.store.get(this.entityClass, this.id)
    }
}
