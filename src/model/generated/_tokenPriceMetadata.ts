import assert from "assert"
import * as marshal from "./marshal"

export class TokenPriceMetadata {
    private _recalculatedAt!: Date
    private _largestBnbReserve!: bigint

    constructor(props?: Partial<Omit<TokenPriceMetadata, 'toJSON'>>, json?: any) {
        Object.assign(this, props)
        if (json != null) {
            this._recalculatedAt = marshal.datetime.fromJSON(json.recalculatedAt)
            this._largestBnbReserve = marshal.bigint.fromJSON(json.largestBnbReserve)
        }
    }

    get recalculatedAt(): Date {
        assert(this._recalculatedAt != null, 'uninitialized access')
        return this._recalculatedAt
    }

    set recalculatedAt(value: Date) {
        this._recalculatedAt = value
    }

    get largestBnbReserve(): bigint {
        assert(this._largestBnbReserve != null, 'uninitialized access')
        return this._largestBnbReserve
    }

    set largestBnbReserve(value: bigint) {
        this._largestBnbReserve = value
    }

    toJSON(): object {
        return {
            recalculatedAt: marshal.datetime.toJSON(this.recalculatedAt),
            largestBnbReserve: marshal.bigint.toJSON(this.largestBnbReserve),
        }
    }
}
