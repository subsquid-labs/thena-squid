export const ABI_JSON = [
    {
        "type": "constructor",
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "_factory"
            },
            {
                "type": "address",
                "name": "_wETH"
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
                "type": "uint256",
                "name": "amount0In",
                "indexed": false
            },
            {
                "type": "address",
                "name": "_tokenIn",
                "indexed": false
            },
            {
                "type": "address",
                "name": "to",
                "indexed": true
            },
            {
                "type": "bool",
                "name": "stable",
                "indexed": false
            }
        ]
    },
    {
        "type": "function",
        "name": "UNSAFE_swapExactTokensForTokens",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "uint256[]",
                "name": "amounts"
            },
            {
                "type": "tuple[]",
                "name": "routes",
                "components": [
                    {
                        "type": "address",
                        "name": "from"
                    },
                    {
                        "type": "address",
                        "name": "to"
                    },
                    {
                        "type": "bool",
                        "name": "stable"
                    }
                ]
            },
            {
                "type": "address",
                "name": "to"
            },
            {
                "type": "uint256",
                "name": "deadline"
            }
        ],
        "outputs": [
            {
                "type": "uint256[]"
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
                "type": "address",
                "name": "tokenA"
            },
            {
                "type": "address",
                "name": "tokenB"
            },
            {
                "type": "bool",
                "name": "stable"
            },
            {
                "type": "uint256",
                "name": "amountADesired"
            },
            {
                "type": "uint256",
                "name": "amountBDesired"
            },
            {
                "type": "uint256",
                "name": "amountAMin"
            },
            {
                "type": "uint256",
                "name": "amountBMin"
            },
            {
                "type": "address",
                "name": "to"
            },
            {
                "type": "uint256",
                "name": "deadline"
            }
        ],
        "outputs": [
            {
                "type": "uint256",
                "name": "amountA"
            },
            {
                "type": "uint256",
                "name": "amountB"
            },
            {
                "type": "uint256",
                "name": "liquidity"
            }
        ]
    },
    {
        "type": "function",
        "name": "addLiquidityETH",
        "constant": false,
        "stateMutability": "payable",
        "payable": true,
        "inputs": [
            {
                "type": "address",
                "name": "token"
            },
            {
                "type": "bool",
                "name": "stable"
            },
            {
                "type": "uint256",
                "name": "amountTokenDesired"
            },
            {
                "type": "uint256",
                "name": "amountTokenMin"
            },
            {
                "type": "uint256",
                "name": "amountETHMin"
            },
            {
                "type": "address",
                "name": "to"
            },
            {
                "type": "uint256",
                "name": "deadline"
            }
        ],
        "outputs": [
            {
                "type": "uint256",
                "name": "amountToken"
            },
            {
                "type": "uint256",
                "name": "amountETH"
            },
            {
                "type": "uint256",
                "name": "liquidity"
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
        "name": "getAmountOut",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [
            {
                "type": "uint256",
                "name": "amountIn"
            },
            {
                "type": "address",
                "name": "tokenIn"
            },
            {
                "type": "address",
                "name": "tokenOut"
            }
        ],
        "outputs": [
            {
                "type": "uint256",
                "name": "amount"
            },
            {
                "type": "bool",
                "name": "stable"
            }
        ]
    },
    {
        "type": "function",
        "name": "getAmountsOut",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [
            {
                "type": "uint256",
                "name": "amountIn"
            },
            {
                "type": "tuple[]",
                "name": "routes",
                "components": [
                    {
                        "type": "address",
                        "name": "from"
                    },
                    {
                        "type": "address",
                        "name": "to"
                    },
                    {
                        "type": "bool",
                        "name": "stable"
                    }
                ]
            }
        ],
        "outputs": [
            {
                "type": "uint256[]",
                "name": "amounts"
            }
        ]
    },
    {
        "type": "function",
        "name": "getReserves",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "tokenA"
            },
            {
                "type": "address",
                "name": "tokenB"
            },
            {
                "type": "bool",
                "name": "stable"
            }
        ],
        "outputs": [
            {
                "type": "uint256",
                "name": "reserveA"
            },
            {
                "type": "uint256",
                "name": "reserveB"
            }
        ]
    },
    {
        "type": "function",
        "name": "isPair",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "pair"
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
        "name": "pairFor",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "tokenA"
            },
            {
                "type": "address",
                "name": "tokenB"
            },
            {
                "type": "bool",
                "name": "stable"
            }
        ],
        "outputs": [
            {
                "type": "address",
                "name": "pair"
            }
        ]
    },
    {
        "type": "function",
        "name": "quoteAddLiquidity",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "tokenA"
            },
            {
                "type": "address",
                "name": "tokenB"
            },
            {
                "type": "bool",
                "name": "stable"
            },
            {
                "type": "uint256",
                "name": "amountADesired"
            },
            {
                "type": "uint256",
                "name": "amountBDesired"
            }
        ],
        "outputs": [
            {
                "type": "uint256",
                "name": "amountA"
            },
            {
                "type": "uint256",
                "name": "amountB"
            },
            {
                "type": "uint256",
                "name": "liquidity"
            }
        ]
    },
    {
        "type": "function",
        "name": "quoteRemoveLiquidity",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "tokenA"
            },
            {
                "type": "address",
                "name": "tokenB"
            },
            {
                "type": "bool",
                "name": "stable"
            },
            {
                "type": "uint256",
                "name": "liquidity"
            }
        ],
        "outputs": [
            {
                "type": "uint256",
                "name": "amountA"
            },
            {
                "type": "uint256",
                "name": "amountB"
            }
        ]
    },
    {
        "type": "function",
        "name": "removeLiquidity",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "tokenA"
            },
            {
                "type": "address",
                "name": "tokenB"
            },
            {
                "type": "bool",
                "name": "stable"
            },
            {
                "type": "uint256",
                "name": "liquidity"
            },
            {
                "type": "uint256",
                "name": "amountAMin"
            },
            {
                "type": "uint256",
                "name": "amountBMin"
            },
            {
                "type": "address",
                "name": "to"
            },
            {
                "type": "uint256",
                "name": "deadline"
            }
        ],
        "outputs": [
            {
                "type": "uint256",
                "name": "amountA"
            },
            {
                "type": "uint256",
                "name": "amountB"
            }
        ]
    },
    {
        "type": "function",
        "name": "removeLiquidityETH",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "token"
            },
            {
                "type": "bool",
                "name": "stable"
            },
            {
                "type": "uint256",
                "name": "liquidity"
            },
            {
                "type": "uint256",
                "name": "amountTokenMin"
            },
            {
                "type": "uint256",
                "name": "amountETHMin"
            },
            {
                "type": "address",
                "name": "to"
            },
            {
                "type": "uint256",
                "name": "deadline"
            }
        ],
        "outputs": [
            {
                "type": "uint256",
                "name": "amountToken"
            },
            {
                "type": "uint256",
                "name": "amountETH"
            }
        ]
    },
    {
        "type": "function",
        "name": "removeLiquidityETHSupportingFeeOnTransferTokens",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "token"
            },
            {
                "type": "bool",
                "name": "stable"
            },
            {
                "type": "uint256",
                "name": "liquidity"
            },
            {
                "type": "uint256",
                "name": "amountTokenMin"
            },
            {
                "type": "uint256",
                "name": "amountETHMin"
            },
            {
                "type": "address",
                "name": "to"
            },
            {
                "type": "uint256",
                "name": "deadline"
            }
        ],
        "outputs": [
            {
                "type": "uint256",
                "name": "amountToken"
            },
            {
                "type": "uint256",
                "name": "amountETH"
            }
        ]
    },
    {
        "type": "function",
        "name": "removeLiquidityETHWithPermit",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "token"
            },
            {
                "type": "bool",
                "name": "stable"
            },
            {
                "type": "uint256",
                "name": "liquidity"
            },
            {
                "type": "uint256",
                "name": "amountTokenMin"
            },
            {
                "type": "uint256",
                "name": "amountETHMin"
            },
            {
                "type": "address",
                "name": "to"
            },
            {
                "type": "uint256",
                "name": "deadline"
            },
            {
                "type": "bool",
                "name": "approveMax"
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
        "outputs": [
            {
                "type": "uint256",
                "name": "amountToken"
            },
            {
                "type": "uint256",
                "name": "amountETH"
            }
        ]
    },
    {
        "type": "function",
        "name": "removeLiquidityETHWithPermitSupportingFeeOnTransferTokens",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "token"
            },
            {
                "type": "bool",
                "name": "stable"
            },
            {
                "type": "uint256",
                "name": "liquidity"
            },
            {
                "type": "uint256",
                "name": "amountTokenMin"
            },
            {
                "type": "uint256",
                "name": "amountETHMin"
            },
            {
                "type": "address",
                "name": "to"
            },
            {
                "type": "uint256",
                "name": "deadline"
            },
            {
                "type": "bool",
                "name": "approveMax"
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
        "outputs": [
            {
                "type": "uint256",
                "name": "amountToken"
            },
            {
                "type": "uint256",
                "name": "amountETH"
            }
        ]
    },
    {
        "type": "function",
        "name": "removeLiquidityWithPermit",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "tokenA"
            },
            {
                "type": "address",
                "name": "tokenB"
            },
            {
                "type": "bool",
                "name": "stable"
            },
            {
                "type": "uint256",
                "name": "liquidity"
            },
            {
                "type": "uint256",
                "name": "amountAMin"
            },
            {
                "type": "uint256",
                "name": "amountBMin"
            },
            {
                "type": "address",
                "name": "to"
            },
            {
                "type": "uint256",
                "name": "deadline"
            },
            {
                "type": "bool",
                "name": "approveMax"
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
        "outputs": [
            {
                "type": "uint256",
                "name": "amountA"
            },
            {
                "type": "uint256",
                "name": "amountB"
            }
        ]
    },
    {
        "type": "function",
        "name": "sortTokens",
        "constant": true,
        "stateMutability": "pure",
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "tokenA"
            },
            {
                "type": "address",
                "name": "tokenB"
            }
        ],
        "outputs": [
            {
                "type": "address",
                "name": "token0"
            },
            {
                "type": "address",
                "name": "token1"
            }
        ]
    },
    {
        "type": "function",
        "name": "swapExactETHForTokens",
        "constant": false,
        "stateMutability": "payable",
        "payable": true,
        "inputs": [
            {
                "type": "uint256",
                "name": "amountOutMin"
            },
            {
                "type": "tuple[]",
                "name": "routes",
                "components": [
                    {
                        "type": "address",
                        "name": "from"
                    },
                    {
                        "type": "address",
                        "name": "to"
                    },
                    {
                        "type": "bool",
                        "name": "stable"
                    }
                ]
            },
            {
                "type": "address",
                "name": "to"
            },
            {
                "type": "uint256",
                "name": "deadline"
            }
        ],
        "outputs": [
            {
                "type": "uint256[]",
                "name": "amounts"
            }
        ]
    },
    {
        "type": "function",
        "name": "swapExactETHForTokensSupportingFeeOnTransferTokens",
        "constant": false,
        "stateMutability": "payable",
        "payable": true,
        "inputs": [
            {
                "type": "uint256",
                "name": "amountOutMin"
            },
            {
                "type": "tuple[]",
                "name": "routes",
                "components": [
                    {
                        "type": "address",
                        "name": "from"
                    },
                    {
                        "type": "address",
                        "name": "to"
                    },
                    {
                        "type": "bool",
                        "name": "stable"
                    }
                ]
            },
            {
                "type": "address",
                "name": "to"
            },
            {
                "type": "uint256",
                "name": "deadline"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "swapExactTokensForETH",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "uint256",
                "name": "amountIn"
            },
            {
                "type": "uint256",
                "name": "amountOutMin"
            },
            {
                "type": "tuple[]",
                "name": "routes",
                "components": [
                    {
                        "type": "address",
                        "name": "from"
                    },
                    {
                        "type": "address",
                        "name": "to"
                    },
                    {
                        "type": "bool",
                        "name": "stable"
                    }
                ]
            },
            {
                "type": "address",
                "name": "to"
            },
            {
                "type": "uint256",
                "name": "deadline"
            }
        ],
        "outputs": [
            {
                "type": "uint256[]",
                "name": "amounts"
            }
        ]
    },
    {
        "type": "function",
        "name": "swapExactTokensForETHSupportingFeeOnTransferTokens",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "uint256",
                "name": "amountIn"
            },
            {
                "type": "uint256",
                "name": "amountOutMin"
            },
            {
                "type": "tuple[]",
                "name": "routes",
                "components": [
                    {
                        "type": "address",
                        "name": "from"
                    },
                    {
                        "type": "address",
                        "name": "to"
                    },
                    {
                        "type": "bool",
                        "name": "stable"
                    }
                ]
            },
            {
                "type": "address",
                "name": "to"
            },
            {
                "type": "uint256",
                "name": "deadline"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "swapExactTokensForTokens",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "uint256",
                "name": "amountIn"
            },
            {
                "type": "uint256",
                "name": "amountOutMin"
            },
            {
                "type": "tuple[]",
                "name": "routes",
                "components": [
                    {
                        "type": "address",
                        "name": "from"
                    },
                    {
                        "type": "address",
                        "name": "to"
                    },
                    {
                        "type": "bool",
                        "name": "stable"
                    }
                ]
            },
            {
                "type": "address",
                "name": "to"
            },
            {
                "type": "uint256",
                "name": "deadline"
            }
        ],
        "outputs": [
            {
                "type": "uint256[]",
                "name": "amounts"
            }
        ]
    },
    {
        "type": "function",
        "name": "swapExactTokensForTokensSimple",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "uint256",
                "name": "amountIn"
            },
            {
                "type": "uint256",
                "name": "amountOutMin"
            },
            {
                "type": "address",
                "name": "tokenFrom"
            },
            {
                "type": "address",
                "name": "tokenTo"
            },
            {
                "type": "bool",
                "name": "stable"
            },
            {
                "type": "address",
                "name": "to"
            },
            {
                "type": "uint256",
                "name": "deadline"
            }
        ],
        "outputs": [
            {
                "type": "uint256[]",
                "name": "amounts"
            }
        ]
    },
    {
        "type": "function",
        "name": "swapExactTokensForTokensSupportingFeeOnTransferTokens",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "uint256",
                "name": "amountIn"
            },
            {
                "type": "uint256",
                "name": "amountOutMin"
            },
            {
                "type": "tuple[]",
                "name": "routes",
                "components": [
                    {
                        "type": "address",
                        "name": "from"
                    },
                    {
                        "type": "address",
                        "name": "to"
                    },
                    {
                        "type": "bool",
                        "name": "stable"
                    }
                ]
            },
            {
                "type": "address",
                "name": "to"
            },
            {
                "type": "uint256",
                "name": "deadline"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "wETH",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [],
        "outputs": [
            {
                "type": "address"
            }
        ]
    }
]
