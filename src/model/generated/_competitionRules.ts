import assert from "assert"
import * as marshal from "./marshal"

export class CompetitionRules {
    private _startingBalance!: bigint
    private _winningToken!: string
    private _tradingTokens!: (string)[]
    private _winningTokenDecimal!: number

    constructor(props?: Partial<Omit<CompetitionRules, 'toJSON'>>, json?: any) {
        Object.assign(this, props)
        if (json != null) {
            this._startingBalance = marshal.bigint.fromJSON(json.startingBalance)
            this._winningToken = marshal.string.fromJSON(json.winningToken)
            this._tradingTokens = marshal.fromList(json.tradingTokens, val => marshal.string.fromJSON(val))
            this._winningTokenDecimal = marshal.int.fromJSON(json.winningTokenDecimal)
        }
    }

    get startingBalance(): bigint {
        assert(this._startingBalance != null, 'uninitialized access')
        return this._startingBalance
    }

    set startingBalance(value: bigint) {
        this._startingBalance = value
    }

    get winningToken(): string {
        assert(this._winningToken != null, 'uninitialized access')
        return this._winningToken
    }

    set winningToken(value: string) {
        this._winningToken = value
    }

    get tradingTokens(): (string)[] {
        assert(this._tradingTokens != null, 'uninitialized access')
        return this._tradingTokens
    }

    set tradingTokens(value: (string)[]) {
        this._tradingTokens = value
    }

    get winningTokenDecimal(): number {
        assert(this._winningTokenDecimal != null, 'uninitialized access')
        return this._winningTokenDecimal
    }

    set winningTokenDecimal(value: number) {
        this._winningTokenDecimal = value
    }

    toJSON(): object {
        return {
            startingBalance: marshal.bigint.toJSON(this.startingBalance),
            winningToken: this.winningToken,
            tradingTokens: this.tradingTokens,
            winningTokenDecimal: this.winningTokenDecimal,
        }
    }
}
