import assert from "assert"
import * as marshal from "./marshal"

export class Attribute {
    private _traitType!: string
    private _value!: string

    constructor(props?: Partial<Omit<Attribute, 'toJSON'>>, json?: any) {
        Object.assign(this, props)
        if (json != null) {
            this._traitType = marshal.string.fromJSON(json.traitType)
            this._value = marshal.string.fromJSON(json.value)
        }
    }

    get traitType(): string {
        assert(this._traitType != null, 'uninitialized access')
        return this._traitType
    }

    set traitType(value: string) {
        this._traitType = value
    }

    get value(): string {
        assert(this._value != null, 'uninitialized access')
        return this._value
    }

    set value(value: string) {
        this._value = value
    }

    toJSON(): object {
        return {
            traitType: this.traitType,
            value: this.value,
        }
    }
}
