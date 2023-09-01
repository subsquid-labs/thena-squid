import assert from "assert"
import * as marshal from "./marshal"

export class TimestampInfo {
    private _startTimestamp!: bigint
    private _endTimestamp!: bigint
    private _registrationStart!: bigint
    private _registrationEnd!: bigint

    constructor(props?: Partial<Omit<TimestampInfo, 'toJSON'>>, json?: any) {
        Object.assign(this, props)
        if (json != null) {
            this._startTimestamp = marshal.bigint.fromJSON(json.startTimestamp)
            this._endTimestamp = marshal.bigint.fromJSON(json.endTimestamp)
            this._registrationStart = marshal.bigint.fromJSON(json.registrationStart)
            this._registrationEnd = marshal.bigint.fromJSON(json.registrationEnd)
        }
    }

    get startTimestamp(): bigint {
        assert(this._startTimestamp != null, 'uninitialized access')
        return this._startTimestamp
    }

    set startTimestamp(value: bigint) {
        this._startTimestamp = value
    }

    get endTimestamp(): bigint {
        assert(this._endTimestamp != null, 'uninitialized access')
        return this._endTimestamp
    }

    set endTimestamp(value: bigint) {
        this._endTimestamp = value
    }

    get registrationStart(): bigint {
        assert(this._registrationStart != null, 'uninitialized access')
        return this._registrationStart
    }

    set registrationStart(value: bigint) {
        this._registrationStart = value
    }

    get registrationEnd(): bigint {
        assert(this._registrationEnd != null, 'uninitialized access')
        return this._registrationEnd
    }

    set registrationEnd(value: bigint) {
        this._registrationEnd = value
    }

    toJSON(): object {
        return {
            startTimestamp: marshal.bigint.toJSON(this.startTimestamp),
            endTimestamp: marshal.bigint.toJSON(this.endTimestamp),
            registrationStart: marshal.bigint.toJSON(this.registrationStart),
            registrationEnd: marshal.bigint.toJSON(this.registrationEnd),
        }
    }
}
