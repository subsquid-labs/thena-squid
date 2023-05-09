export const ABI_JSON = [
    {
        "type": "constructor",
        "stateMutability": "undefined",
        "payable": false,
        "inputs": []
    },
    {
        "type": "event",
        "anonymous": false,
        "name": "Burn",
        "inputs": [
            {
                "type": "address",
                "name": "owner",
                "indexed": true
            },
            {
                "type": "int24",
                "name": "bottomTick",
                "indexed": true
            },
            {
                "type": "int24",
                "name": "topTick",
                "indexed": true
            },
            {
                "type": "uint128",
                "name": "liquidityAmount",
                "indexed": false
            },
            {
                "type": "uint256",
                "name": "amount0",
                "indexed": false
            },
            {
                "type": "uint256",
                "name": "amount1",
                "indexed": false
            }
        ]
    },
    {
        "type": "event",
        "anonymous": false,
        "name": "Collect",
        "inputs": [
            {
                "type": "address",
                "name": "owner",
                "indexed": true
            },
            {
                "type": "address",
                "name": "recipient",
                "indexed": false
            },
            {
                "type": "int24",
                "name": "bottomTick",
                "indexed": true
            },
            {
                "type": "int24",
                "name": "topTick",
                "indexed": true
            },
            {
                "type": "uint128",
                "name": "amount0",
                "indexed": false
            },
            {
                "type": "uint128",
                "name": "amount1",
                "indexed": false
            }
        ]
    },
    {
        "type": "event",
        "anonymous": false,
        "name": "CommunityFee",
        "inputs": [
            {
                "type": "uint16",
                "name": "communityFee0New",
                "indexed": false
            },
            {
                "type": "uint16",
                "name": "communityFee1New",
                "indexed": false
            }
        ]
    },
    {
        "type": "event",
        "anonymous": false,
        "name": "Fee",
        "inputs": [
            {
                "type": "uint16",
                "name": "fee",
                "indexed": false
            }
        ]
    },
    {
        "type": "event",
        "anonymous": false,
        "name": "Flash",
        "inputs": [
            {
                "type": "address",
                "name": "sender",
                "indexed": true
            },
            {
                "type": "address",
                "name": "recipient",
                "indexed": true
            },
            {
                "type": "uint256",
                "name": "amount0",
                "indexed": false
            },
            {
                "type": "uint256",
                "name": "amount1",
                "indexed": false
            },
            {
                "type": "uint256",
                "name": "paid0",
                "indexed": false
            },
            {
                "type": "uint256",
                "name": "paid1",
                "indexed": false
            }
        ]
    },
    {
        "type": "event",
        "anonymous": false,
        "name": "Incentive",
        "inputs": [
            {
                "type": "address",
                "name": "virtualPoolAddress",
                "indexed": true
            }
        ]
    },
    {
        "type": "event",
        "anonymous": false,
        "name": "Initialize",
        "inputs": [
            {
                "type": "uint160",
                "name": "price",
                "indexed": false
            },
            {
                "type": "int24",
                "name": "tick",
                "indexed": false
            }
        ]
    },
    {
        "type": "event",
        "anonymous": false,
        "name": "LiquidityCooldown",
        "inputs": [
            {
                "type": "uint32",
                "name": "liquidityCooldown",
                "indexed": false
            }
        ]
    },
    {
        "type": "event",
        "anonymous": false,
        "name": "Mint",
        "inputs": [
            {
                "type": "address",
                "name": "sender",
                "indexed": false
            },
            {
                "type": "address",
                "name": "owner",
                "indexed": true
            },
            {
                "type": "int24",
                "name": "bottomTick",
                "indexed": true
            },
            {
                "type": "int24",
                "name": "topTick",
                "indexed": true
            },
            {
                "type": "uint128",
                "name": "liquidityAmount",
                "indexed": false
            },
            {
                "type": "uint256",
                "name": "amount0",
                "indexed": false
            },
            {
                "type": "uint256",
                "name": "amount1",
                "indexed": false
            }
        ]
    },
    {
        "type": "event",
        "anonymous": false,
        "name": "Swap",
        "inputs": [
            {
                "type": "address",
                "name": "sender",
                "indexed": true
            },
            {
                "type": "address",
                "name": "recipient",
                "indexed": true
            },
            {
                "type": "int256",
                "name": "amount0",
                "indexed": false
            },
            {
                "type": "int256",
                "name": "amount1",
                "indexed": false
            },
            {
                "type": "uint160",
                "name": "price",
                "indexed": false
            },
            {
                "type": "uint128",
                "name": "liquidity",
                "indexed": false
            },
            {
                "type": "int24",
                "name": "tick",
                "indexed": false
            }
        ]
    },
    {
        "type": "function",
        "name": "activeIncentive",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [],
        "outputs": [
            {
                "type": "address"
            }
        ]
    },
    {
        "type": "function",
        "name": "burn",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "int24",
                "name": "bottomTick"
            },
            {
                "type": "int24",
                "name": "topTick"
            },
            {
                "type": "uint128",
                "name": "amount"
            }
        ],
        "outputs": [
            {
                "type": "uint256",
                "name": "amount0"
            },
            {
                "type": "uint256",
                "name": "amount1"
            }
        ]
    },
    {
        "type": "function",
        "name": "collect",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "recipient"
            },
            {
                "type": "int24",
                "name": "bottomTick"
            },
            {
                "type": "int24",
                "name": "topTick"
            },
            {
                "type": "uint128",
                "name": "amount0Requested"
            },
            {
                "type": "uint128",
                "name": "amount1Requested"
            }
        ],
        "outputs": [
            {
                "type": "uint128",
                "name": "amount0"
            },
            {
                "type": "uint128",
                "name": "amount1"
            }
        ]
    },
    {
        "type": "function",
        "name": "dataStorageOperator",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [],
        "outputs": [
            {
                "type": "address"
            }
        ]
    },
    {
        "type": "function",
        "name": "factory",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [],
        "outputs": [
            {
                "type": "address"
            }
        ]
    },
    {
        "type": "function",
        "name": "flash",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "recipient"
            },
            {
                "type": "uint256",
                "name": "amount0"
            },
            {
                "type": "uint256",
                "name": "amount1"
            },
            {
                "type": "bytes",
                "name": "data"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "getInnerCumulatives",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [
            {
                "type": "int24",
                "name": "bottomTick"
            },
            {
                "type": "int24",
                "name": "topTick"
            }
        ],
        "outputs": [
            {
                "type": "int56",
                "name": "innerTickCumulative"
            },
            {
                "type": "uint160",
                "name": "innerSecondsSpentPerLiquidity"
            },
            {
                "type": "uint32",
                "name": "innerSecondsSpent"
            }
        ]
    },
    {
        "type": "function",
        "name": "getTimepoints",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [
            {
                "type": "uint32[]",
                "name": "secondsAgos"
            }
        ],
        "outputs": [
            {
                "type": "int56[]",
                "name": "tickCumulatives"
            },
            {
                "type": "uint160[]",
                "name": "secondsPerLiquidityCumulatives"
            },
            {
                "type": "uint112[]",
                "name": "volatilityCumulatives"
            },
            {
                "type": "uint256[]",
                "name": "volumePerAvgLiquiditys"
            }
        ]
    },
    {
        "type": "function",
        "name": "globalState",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [],
        "outputs": [
            {
                "type": "uint160",
                "name": "price"
            },
            {
                "type": "int24",
                "name": "tick"
            },
            {
                "type": "uint16",
                "name": "fee"
            },
            {
                "type": "uint16",
                "name": "timepointIndex"
            },
            {
                "type": "uint16",
                "name": "communityFeeToken0"
            },
            {
                "type": "uint16",
                "name": "communityFeeToken1"
            },
            {
                "type": "bool",
                "name": "unlocked"
            }
        ]
    },
    {
        "type": "function",
        "name": "initialize",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "uint160",
                "name": "initialPrice"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "liquidity",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [],
        "outputs": [
            {
                "type": "uint128"
            }
        ]
    },
    {
        "type": "function",
        "name": "liquidityCooldown",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [],
        "outputs": [
            {
                "type": "uint32"
            }
        ]
    },
    {
        "type": "function",
        "name": "maxLiquidityPerTick",
        "constant": true,
        "stateMutability": "pure",
        "payable": false,
        "inputs": [],
        "outputs": [
            {
                "type": "uint128"
            }
        ]
    },
    {
        "type": "function",
        "name": "mint",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "sender"
            },
            {
                "type": "address",
                "name": "recipient"
            },
            {
                "type": "int24",
                "name": "bottomTick"
            },
            {
                "type": "int24",
                "name": "topTick"
            },
            {
                "type": "uint128",
                "name": "liquidityDesired"
            },
            {
                "type": "bytes",
                "name": "data"
            }
        ],
        "outputs": [
            {
                "type": "uint256",
                "name": "amount0"
            },
            {
                "type": "uint256",
                "name": "amount1"
            },
            {
                "type": "uint128",
                "name": "liquidityActual"
            }
        ]
    },
    {
        "type": "function",
        "name": "positions",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [
            {
                "type": "bytes32"
            }
        ],
        "outputs": [
            {
                "type": "uint128",
                "name": "liquidity"
            },
            {
                "type": "uint32",
                "name": "lastLiquidityAddTimestamp"
            },
            {
                "type": "uint256",
                "name": "innerFeeGrowth0Token"
            },
            {
                "type": "uint256",
                "name": "innerFeeGrowth1Token"
            },
            {
                "type": "uint128",
                "name": "fees0"
            },
            {
                "type": "uint128",
                "name": "fees1"
            }
        ]
    },
    {
        "type": "function",
        "name": "setCommunityFee",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "uint16",
                "name": "communityFee0"
            },
            {
                "type": "uint16",
                "name": "communityFee1"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "setIncentive",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "virtualPoolAddress"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "setLiquidityCooldown",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "uint32",
                "name": "newLiquidityCooldown"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "swap",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "recipient"
            },
            {
                "type": "bool",
                "name": "zeroToOne"
            },
            {
                "type": "int256",
                "name": "amountRequired"
            },
            {
                "type": "uint160",
                "name": "limitSqrtPrice"
            },
            {
                "type": "bytes",
                "name": "data"
            }
        ],
        "outputs": [
            {
                "type": "int256",
                "name": "amount0"
            },
            {
                "type": "int256",
                "name": "amount1"
            }
        ]
    },
    {
        "type": "function",
        "name": "swapSupportingFeeOnInputTokens",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "sender"
            },
            {
                "type": "address",
                "name": "recipient"
            },
            {
                "type": "bool",
                "name": "zeroToOne"
            },
            {
                "type": "int256",
                "name": "amountRequired"
            },
            {
                "type": "uint160",
                "name": "limitSqrtPrice"
            },
            {
                "type": "bytes",
                "name": "data"
            }
        ],
        "outputs": [
            {
                "type": "int256",
                "name": "amount0"
            },
            {
                "type": "int256",
                "name": "amount1"
            }
        ]
    },
    {
        "type": "function",
        "name": "tickSpacing",
        "constant": true,
        "stateMutability": "pure",
        "payable": false,
        "inputs": [],
        "outputs": [
            {
                "type": "int24"
            }
        ]
    },
    {
        "type": "function",
        "name": "tickTable",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [
            {
                "type": "int16"
            }
        ],
        "outputs": [
            {
                "type": "uint256"
            }
        ]
    },
    {
        "type": "function",
        "name": "ticks",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [
            {
                "type": "int24"
            }
        ],
        "outputs": [
            {
                "type": "uint128",
                "name": "liquidityTotal"
            },
            {
                "type": "int128",
                "name": "liquidityDelta"
            },
            {
                "type": "uint256",
                "name": "outerFeeGrowth0Token"
            },
            {
                "type": "uint256",
                "name": "outerFeeGrowth1Token"
            },
            {
                "type": "int56",
                "name": "outerTickCumulative"
            },
            {
                "type": "uint160",
                "name": "outerSecondsPerLiquidity"
            },
            {
                "type": "uint32",
                "name": "outerSecondsSpent"
            },
            {
                "type": "bool",
                "name": "initialized"
            }
        ]
    },
    {
        "type": "function",
        "name": "timepoints",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [
            {
                "type": "uint256",
                "name": "index"
            }
        ],
        "outputs": [
            {
                "type": "bool",
                "name": "initialized"
            },
            {
                "type": "uint32",
                "name": "blockTimestamp"
            },
            {
                "type": "int56",
                "name": "tickCumulative"
            },
            {
                "type": "uint160",
                "name": "secondsPerLiquidityCumulative"
            },
            {
                "type": "uint88",
                "name": "volatilityCumulative"
            },
            {
                "type": "int24",
                "name": "averageTick"
            },
            {
                "type": "uint144",
                "name": "volumePerLiquidityCumulative"
            }
        ]
    },
    {
        "type": "function",
        "name": "token0",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [],
        "outputs": [
            {
                "type": "address"
            }
        ]
    },
    {
        "type": "function",
        "name": "token1",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [],
        "outputs": [
            {
                "type": "address"
            }
        ]
    },
    {
        "type": "function",
        "name": "totalFeeGrowth0Token",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [],
        "outputs": [
            {
                "type": "uint256"
            }
        ]
    },
    {
        "type": "function",
        "name": "totalFeeGrowth1Token",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [],
        "outputs": [
            {
                "type": "uint256"
            }
        ]
    }
]
