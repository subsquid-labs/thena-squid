import {Log, Transaction} from '../processor'

export type Item = {
    kind: 'log'
    address: string
    value: Log
} | {
    kind: 'transaction'
    address: string | undefined
    value: Transaction
}