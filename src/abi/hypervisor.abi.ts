export const ABI_JSON = [
    {
        "type": "constructor",
        "stateMutability": "undefined",
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "_pool"
            },
            {
                "type": "address",
                "name": "_owner"
            },
            {
                "type": "string",
                "name": "name"
            },
            {
                "type": "string",
                "name": "symbol"
            }
        ]
    },
    {
        "type": "event",
        "anonymous": false,
        "name": "Approval",
        "inputs": [
            {
                "type": "address",
                "name": "owner",
                "indexed": true
            },
            {
                "type": "address",
                "name": "spender",
                "indexed": true
            },
            {
                "type": "uint256",
                "name": "value",
                "indexed": false
            }
        ]
    },
    {
        "type": "event",
        "anonymous": false,
        "name": "Deposit",
        "inputs": [
            {
                "type": "address",
                "name": "sender",
                "indexed": true
            },
            {
                "type": "address",
                "name": "to",
                "indexed": true
            },
            {
                "type": "uint256",
                "name": "shares",
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
        "name": "Rebalance",
        "inputs": [
            {
                "type": "int24",
                "name": "tick",
                "indexed": false
            },
            {
                "type": "uint256",
                "name": "totalAmount0",
                "indexed": false
            },
            {
                "type": "uint256",
                "name": "totalAmount1",
                "indexed": false
            },
            {
                "type": "uint256",
                "name": "feeAmount0",
                "indexed": false
            },
            {
                "type": "uint256",
                "name": "feeAmount1",
                "indexed": false
            },
            {
                "type": "uint256",
                "name": "totalSupply",
                "indexed": false
            }
        ]
    },
    {
        "type": "event",
        "anonymous": false,
        "name": "SetFee",
        "inputs": [
            {
                "type": "uint8",
                "name": "newFee",
                "indexed": false
            }
        ]
    },
    {
        "type": "event",
        "anonymous": false,
        "name": "Transfer",
        "inputs": [
            {
                "type": "address",
                "name": "from",
                "indexed": true
            },
            {
                "type": "address",
                "name": "to",
                "indexed": true
            },
            {
                "type": "uint256",
                "name": "value",
                "indexed": false
            }
        ]
    },
    {
        "type": "event",
        "anonymous": false,
        "name": "Withdraw",
        "inputs": [
            {
                "type": "address",
                "name": "sender",
                "indexed": true
            },
            {
                "type": "address",
                "name": "to",
                "indexed": true
            },
            {
                "type": "uint256",
                "name": "shares",
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
        "name": "ZeroBurn",
        "inputs": [
            {
                "type": "uint8",
                "name": "fee",
                "indexed": false
            },
            {
                "type": "uint256",
                "name": "fees0",
                "indexed": false
            },
            {
                "type": "uint256",
                "name": "fees1",
                "indexed": false
            }
        ]
    },
    {
        "type": "function",
        "name": "DOMAIN_SEPARATOR",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [],
        "outputs": [
            {
                "type": "bytes32"
            }
        ]
    },
    {
        "type": "function",
        "name": "PRECISION",
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
        "name": "addLiquidity",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "int24",
                "name": "tickLower"
            },
            {
                "type": "int24",
                "name": "tickUpper"
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
                "type": "uint256[2]",
                "name": "inMin"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "algebraMintCallback",
        "constant": false,
        "payable": false,
        "inputs": [
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
        "name": "allowance",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "owner"
            },
            {
                "type": "address",
                "name": "spender"
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
        "name": "approve",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "spender"
            },
            {
                "type": "uint256",
                "name": "amount"
            }
        ],
        "outputs": [
            {
                "type": "bool"
            }
        ]
    },
    {
        "type": "function",
        "name": "balanceOf",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "account"
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
        "name": "baseLower",
        "constant": true,
        "stateMutability": "view",
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
        "name": "baseUpper",
        "constant": true,
        "stateMutability": "view",
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
        "name": "compound",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "uint256[4]",
                "name": "inMin"
            }
        ],
        "outputs": [
            {
                "type": "uint128",
                "name": "baseToken0Owed"
            },
            {
                "type": "uint128",
                "name": "baseToken1Owed"
            },
            {
                "type": "uint128",
                "name": "limitToken0Owed"
            },
            {
                "type": "uint128",
                "name": "limitToken1Owed"
            }
        ]
    },
    {
        "type": "function",
        "name": "currentTick",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [],
        "outputs": [
            {
                "type": "int24",
                "name": "tick"
            }
        ]
    },
    {
        "type": "function",
        "name": "decimals",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [],
        "outputs": [
            {
                "type": "uint8"
            }
        ]
    },
    {
        "type": "function",
        "name": "decreaseAllowance",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "spender"
            },
            {
                "type": "uint256",
                "name": "subtractedValue"
            }
        ],
        "outputs": [
            {
                "type": "bool"
            }
        ]
    },
    {
        "type": "function",
        "name": "deposit",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "uint256",
                "name": "deposit0"
            },
            {
                "type": "uint256",
                "name": "deposit1"
            },
            {
                "type": "address",
                "name": "to"
            },
            {
                "type": "address",
                "name": "from"
            },
            {
                "type": "uint256[4]",
                "name": "inMin"
            }
        ],
        "outputs": [
            {
                "type": "uint256",
                "name": "shares"
            }
        ]
    },
    {
        "type": "function",
        "name": "deposit0Max",
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
        "name": "deposit1Max",
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
        "name": "directDeposit",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [],
        "outputs": [
            {
                "type": "bool"
            }
        ]
    },
    {
        "type": "function",
        "name": "fee",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [],
        "outputs": [
            {
                "type": "uint8"
            }
        ]
    },
    {
        "type": "function",
        "name": "feeRecipient",
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
        "name": "getBasePosition",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [],
        "outputs": [
            {
                "type": "uint128",
                "name": "liquidity"
            },
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
        "name": "getLimitPosition",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [],
        "outputs": [
            {
                "type": "uint128",
                "name": "liquidity"
            },
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
        "name": "getTotalAmounts",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [],
        "outputs": [
            {
                "type": "uint256",
                "name": "total0"
            },
            {
                "type": "uint256",
                "name": "total1"
            }
        ]
    },
    {
        "type": "function",
        "name": "increaseAllowance",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "spender"
            },
            {
                "type": "uint256",
                "name": "addedValue"
            }
        ],
        "outputs": [
            {
                "type": "bool"
            }
        ]
    },
    {
        "type": "function",
        "name": "limitLower",
        "constant": true,
        "stateMutability": "view",
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
        "name": "limitUpper",
        "constant": true,
        "stateMutability": "view",
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
        "name": "maxTotalSupply",
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
        "name": "name",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [],
        "outputs": [
            {
                "type": "string"
            }
        ]
    },
    {
        "type": "function",
        "name": "nonces",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "owner"
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
        "name": "owner",
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
        "name": "permit",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "owner"
            },
            {
                "type": "address",
                "name": "spender"
            },
            {
                "type": "uint256",
                "name": "value"
            },
            {
                "type": "uint256",
                "name": "deadline"
            },
            {
                "type": "uint8",
                "name": "v"
            },
            {
                "type": "bytes32",
                "name": "r"
            },
            {
                "type": "bytes32",
                "name": "s"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "pool",
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
        "name": "pullLiquidity",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "int24",
                "name": "tickLower"
            },
            {
                "type": "int24",
                "name": "tickUpper"
            },
            {
                "type": "uint128",
                "name": "shares"
            },
            {
                "type": "uint256[2]",
                "name": "amountMin"
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
        "name": "rebalance",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "int24",
                "name": "_baseLower"
            },
            {
                "type": "int24",
                "name": "_baseUpper"
            },
            {
                "type": "int24",
                "name": "_limitLower"
            },
            {
                "type": "int24",
                "name": "_limitUpper"
            },
            {
                "type": "address",
                "name": "_feeRecipient"
            },
            {
                "type": "uint256[4]",
                "name": "inMin"
            },
            {
                "type": "uint256[4]",
                "name": "outMin"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "removeWhitelisted",
        "constant": false,
        "payable": false,
        "inputs": [],
        "outputs": []
    },
    {
        "type": "function",
        "name": "setFee",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "uint8",
                "name": "newFee"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "setWhitelist",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "_address"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "symbol",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [],
        "outputs": [
            {
                "type": "string"
            }
        ]
    },
    {
        "type": "function",
        "name": "tickSpacing",
        "constant": true,
        "stateMutability": "view",
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
        "name": "toggleDirectDeposit",
        "constant": false,
        "payable": false,
        "inputs": [],
        "outputs": []
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
        "name": "totalSupply",
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
        "name": "transfer",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "recipient"
            },
            {
                "type": "uint256",
                "name": "amount"
            }
        ],
        "outputs": [
            {
                "type": "bool"
            }
        ]
    },
    {
        "type": "function",
        "name": "transferFrom",
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
                "type": "uint256",
                "name": "amount"
            }
        ],
        "outputs": [
            {
                "type": "bool"
            }
        ]
    },
    {
        "type": "function",
        "name": "transferOwnership",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "newOwner"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "whitelistedAddress",
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
        "name": "withdraw",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "uint256",
                "name": "shares"
            },
            {
                "type": "address",
                "name": "to"
            },
            {
                "type": "address",
                "name": "from"
            },
            {
                "type": "uint256[4]",
                "name": "minAmounts"
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
    }
]
