import assert from "assert"
import * as marshal from "./marshal"
import {Attribute} from "./_attribute"

export class ThenianNftMetadata {
    private _image!: string
    private _attributes!: (Attribute)[]

    constructor(props?: Partial<Omit<ThenianNftMetadata, 'toJSON'>>, json?: any) {
        Object.assign(this, props)
        if (json != null) {
            this._image = marshal.string.fromJSON(json.image)
            this._attributes = marshal.fromList(json.attributes, val => new Attribute(undefined, marshal.nonNull(val)))
        }
    }

    get image(): string {
        assert(this._image != null, 'uninitialized access')
        return this._image
    }

    set image(value: string) {
        this._image = value
    }

    get attributes(): (Attribute)[] {
        assert(this._attributes != null, 'uninitialized access')
        return this._attributes
    }

    set attributes(value: (Attribute)[]) {
        this._attributes = value
    }

    toJSON(): object {
        return {
            image: this.image,
            attributes: this.attributes.map((val: any) => val.toJSON()),
        }
    }
}
