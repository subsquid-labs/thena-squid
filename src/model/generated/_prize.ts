import assert from "assert"
import * as marshal from "./marshal"

export class Prize {
    private _winType!: boolean
    private _weights!: (bigint)[]
    private _totalPrize!: bigint
    private _ownerFee!: bigint
    private _token!: string
    private _hostContribution!: bigint

    constructor(props?: Partial<Omit<Prize, 'toJSON'>>, json?: any) {
        Object.assign(this, props)
        if (json != null) {
            this._winType = marshal.boolean.fromJSON(json.winType)
            this._weights = marshal.fromList(json.weights, val => marshal.bigint.fromJSON(val))
            this._totalPrize = marshal.bigint.fromJSON(json.totalPrize)
            this._ownerFee = marshal.bigint.fromJSON(json.ownerFee)
            this._token = marshal.string.fromJSON(json.token)
            this._hostContribution = marshal.bigint.fromJSON(json.hostContribution)
        }
    }

    get winType(): boolean {
        assert(this._winType != null, 'uninitialized access')
        return this._winType
    }

    set winType(value: boolean) {
        this._winType = value
    }

    get weights(): (bigint)[] {
        assert(this._weights != null, 'uninitialized access')
        return this._weights
    }

    set weights(value: (bigint)[]) {
        this._weights = value
    }

    get totalPrize(): bigint {
        assert(this._totalPrize != null, 'uninitialized access')
        return this._totalPrize
    }

    set totalPrize(value: bigint) {
        this._totalPrize = value
    }

    get ownerFee(): bigint {
        assert(this._ownerFee != null, 'uninitialized access')
        return this._ownerFee
    }

    set ownerFee(value: bigint) {
        this._ownerFee = value
    }

    get token(): string {
        assert(this._token != null, 'uninitialized access')
        return this._token
    }

    set token(value: string) {
        this._token = value
    }

    get hostContribution(): bigint {
        assert(this._hostContribution != null, 'uninitialized access')
        return this._hostContribution
    }

    set hostContribution(value: bigint) {
        this._hostContribution = value
    }

    toJSON(): object {
        return {
            winType: this.winType,
            weights: this.weights.map((val: any) => marshal.bigint.toJSON(val)),
            totalPrize: marshal.bigint.toJSON(this.totalPrize),
            ownerFee: marshal.bigint.toJSON(this.ownerFee),
            token: this.token,
            hostContribution: marshal.bigint.toJSON(this.hostContribution),
        }
    }
}
