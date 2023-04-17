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
                "name": "_WNativeToken"
            },
            {
                "type": "address",
                "name": "_poolDeployer"
            }
        ]
    },
    {
        "type": "function",
        "name": "WNativeToken",
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
        "name": "algebraSwapCallback",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "int256",
                "name": "amount0Delta"
            },
            {
                "type": "int256",
                "name": "amount1Delta"
            },
            {
                "type": "bytes",
                "name": "_data"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "exactInput",
        "constant": false,
        "stateMutability": "payable",
        "payable": true,
        "inputs": [
            {
                "type": "tuple",
                "name": "params",
                "components": [
                    {
                        "type": "bytes",
                        "name": "path"
                    },
                    {
                        "type": "address",
                        "name": "recipient"
                    },
                    {
                        "type": "uint256",
                        "name": "deadline"
                    },
                    {
                        "type": "uint256",
                        "name": "amountIn"
                    },
                    {
                        "type": "uint256",
                        "name": "amountOutMinimum"
                    }
                ]
            }
        ],
        "outputs": [
            {
                "type": "uint256",
                "name": "amountOut"
            }
        ]
    },
    {
        "type": "function",
        "name": "exactInputSingle",
        "constant": false,
        "stateMutability": "payable",
        "payable": true,
        "inputs": [
            {
                "type": "tuple",
                "name": "params",
                "components": [
                    {
                        "type": "address",
                        "name": "tokenIn"
                    },
                    {
                        "type": "address",
                        "name": "tokenOut"
                    },
                    {
                        "type": "address",
                        "name": "recipient"
                    },
                    {
                        "type": "uint256",
                        "name": "deadline"
                    },
                    {
                        "type": "uint256",
                        "name": "amountIn"
                    },
                    {
                        "type": "uint256",
                        "name": "amountOutMinimum"
                    },
                    {
                        "type": "uint160",
                        "name": "limitSqrtPrice"
                    }
                ]
            }
        ],
        "outputs": [
            {
                "type": "uint256",
                "name": "amountOut"
            }
        ]
    },
    {
        "type": "function",
        "name": "exactInputSingleSupportingFeeOnTransferTokens",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "tuple",
                "name": "params",
                "components": [
                    {
                        "type": "address",
                        "name": "tokenIn"
                    },
                    {
                        "type": "address",
                        "name": "tokenOut"
                    },
                    {
                        "type": "address",
                        "name": "recipient"
                    },
                    {
                        "type": "uint256",
                        "name": "deadline"
                    },
                    {
                        "type": "uint256",
                        "name": "amountIn"
                    },
                    {
                        "type": "uint256",
                        "name": "amountOutMinimum"
                    },
                    {
                        "type": "uint160",
                        "name": "limitSqrtPrice"
                    }
                ]
            }
        ],
        "outputs": [
            {
                "type": "uint256",
                "name": "amountOut"
            }
        ]
    },
    {
        "type": "function",
        "name": "exactOutput",
        "constant": false,
        "stateMutability": "payable",
        "payable": true,
        "inputs": [
            {
                "type": "tuple",
                "name": "params",
                "components": [
                    {
                        "type": "bytes",
                        "name": "path"
                    },
                    {
                        "type": "address",
                        "name": "recipient"
                    },
                    {
                        "type": "uint256",
                        "name": "deadline"
                    },
                    {
                        "type": "uint256",
                        "name": "amountOut"
                    },
                    {
                        "type": "uint256",
                        "name": "amountInMaximum"
                    }
                ]
            }
        ],
        "outputs": [
            {
                "type": "uint256",
                "name": "amountIn"
            }
        ]
    },
    {
        "type": "function",
        "name": "exactOutputSingle",
        "constant": false,
        "stateMutability": "payable",
        "payable": true,
        "inputs": [
            {
                "type": "tuple",
                "name": "params",
                "components": [
                    {
                        "type": "address",
                        "name": "tokenIn"
                    },
                    {
                        "type": "address",
                        "name": "tokenOut"
                    },
                    {
                        "type": "uint24",
                        "name": "fee"
                    },
                    {
                        "type": "address",
                        "name": "recipient"
                    },
                    {
                        "type": "uint256",
                        "name": "deadline"
                    },
                    {
                        "type": "uint256",
                        "name": "amountOut"
                    },
                    {
                        "type": "uint256",
                        "name": "amountInMaximum"
                    },
                    {
                        "type": "uint160",
                        "name": "limitSqrtPrice"
                    }
                ]
            }
        ],
        "outputs": [
            {
                "type": "uint256",
                "name": "amountIn"
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
        "name": "multicall",
        "constant": false,
        "stateMutability": "payable",
        "payable": true,
        "inputs": [
            {
                "type": "bytes[]",
                "name": "data"
            }
        ],
        "outputs": [
            {
                "type": "bytes[]",
                "name": "results"
            }
        ]
    },
    {
        "type": "function",
        "name": "poolDeployer",
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
        "name": "refundNativeToken",
        "constant": false,
        "stateMutability": "payable",
        "payable": true,
        "inputs": [],
        "outputs": []
    },
    {
        "type": "function",
        "name": "selfPermit",
        "constant": false,
        "stateMutability": "payable",
        "payable": true,
        "inputs": [
            {
                "type": "address",
                "name": "token"
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
        "name": "selfPermitAllowed",
        "constant": false,
        "stateMutability": "payable",
        "payable": true,
        "inputs": [
            {
                "type": "address",
                "name": "token"
            },
            {
                "type": "uint256",
                "name": "nonce"
            },
            {
                "type": "uint256",
                "name": "expiry"
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
        "name": "selfPermitAllowedIfNecessary",
        "constant": false,
        "stateMutability": "payable",
        "payable": true,
        "inputs": [
            {
                "type": "address",
                "name": "token"
            },
            {
                "type": "uint256",
                "name": "nonce"
            },
            {
                "type": "uint256",
                "name": "expiry"
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
        "name": "selfPermitIfNecessary",
        "constant": false,
        "stateMutability": "payable",
        "payable": true,
        "inputs": [
            {
                "type": "address",
                "name": "token"
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
        "name": "sweepToken",
        "constant": false,
        "stateMutability": "payable",
        "payable": true,
        "inputs": [
            {
                "type": "address",
                "name": "token"
            },
            {
                "type": "uint256",
                "name": "amountMinimum"
            },
            {
                "type": "address",
                "name": "recipient"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "sweepTokenWithFee",
        "constant": false,
        "stateMutability": "payable",
        "payable": true,
        "inputs": [
            {
                "type": "address",
                "name": "token"
            },
            {
                "type": "uint256",
                "name": "amountMinimum"
            },
            {
                "type": "address",
                "name": "recipient"
            },
            {
                "type": "uint256",
                "name": "feeBips"
            },
            {
                "type": "address",
                "name": "feeRecipient"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "unwrapWNativeToken",
        "constant": false,
        "stateMutability": "payable",
        "payable": true,
        "inputs": [
            {
                "type": "uint256",
                "name": "amountMinimum"
            },
            {
                "type": "address",
                "name": "recipient"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "unwrapWNativeTokenWithFee",
        "constant": false,
        "stateMutability": "payable",
        "payable": true,
        "inputs": [
            {
                "type": "uint256",
                "name": "amountMinimum"
            },
            {
                "type": "address",
                "name": "recipient"
            },
            {
                "type": "uint256",
                "name": "feeBips"
            },
            {
                "type": "address",
                "name": "feeRecipient"
            }
        ],
        "outputs": []
    }
]
