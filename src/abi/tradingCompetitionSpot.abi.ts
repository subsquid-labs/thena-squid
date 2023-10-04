export const ABI_JSON = [
    {
        "type": "constructor",
        "stateMutability": "undefined",
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "_owner"
            },
            {
                "type": "address",
                "name": "_manager"
            },
            {
                "type": "uint256",
                "name": "_id"
            }
        ]
    },
    {
        "type": "event",
        "anonymous": false,
        "name": "ClaimOwnerFee",
        "inputs": [
            {
                "type": "address",
                "name": "owner",
                "indexed": true
            },
            {
                "type": "address",
                "name": "to",
                "indexed": false
            },
            {
                "type": "address",
                "name": "token",
                "indexed": true
            },
            {
                "type": "uint256",
                "name": "amount",
                "indexed": false
            }
        ]
    },
    {
        "type": "event",
        "anonymous": false,
        "name": "ClaimPrize",
        "inputs": [
            {
                "type": "address",
                "name": "winner",
                "indexed": true
            },
            {
                "type": "address",
                "name": "to",
                "indexed": false
            },
            {
                "type": "address",
                "name": "token",
                "indexed": true
            },
            {
                "type": "uint256",
                "name": "amount",
                "indexed": false
            }
        ]
    },
    {
        "type": "event",
        "anonymous": false,
        "name": "DepositFund",
        "inputs": [
            {
                "type": "address",
                "name": "user",
                "indexed": true
            },
            {
                "type": "address",
                "name": "token",
                "indexed": true
            },
            {
                "type": "uint256",
                "name": "amountIn",
                "indexed": false
            },
            {
                "type": "uint256",
                "name": "timestamp",
                "indexed": false
            }
        ]
    },
    {
        "type": "event",
        "anonymous": false,
        "name": "Trade",
        "inputs": [
            {
                "type": "address",
                "name": "user",
                "indexed": true
            },
            {
                "type": "address",
                "name": "tokenIn",
                "indexed": true
            },
            {
                "type": "address",
                "name": "tokenOut",
                "indexed": false
            },
            {
                "type": "uint256",
                "name": "amountIn",
                "indexed": false
            },
            {
                "type": "uint256",
                "name": "amountOut",
                "indexed": false
            },
            {
                "type": "tuple[]",
                "name": "calls",
                "components": [
                    {
                        "type": "uint256",
                        "name": "target"
                    },
                    {
                        "type": "uint256",
                        "name": "gasLimit"
                    },
                    {
                        "type": "uint256",
                        "name": "value"
                    },
                    {
                        "type": "bytes",
                        "name": "data"
                    }
                ]
            },
            {
                "type": "uint256",
                "name": "timestamp",
                "indexed": false
            }
        ]
    },
    {
        "type": "event",
        "anonymous": false,
        "name": "WithdrawFund",
        "inputs": [
            {
                "type": "address",
                "name": "user",
                "indexed": true
            },
            {
                "type": "address",
                "name": "token",
                "indexed": true
            },
            {
                "type": "uint256",
                "name": "amountOut",
                "indexed": false
            },
            {
                "type": "uint256",
                "name": "timestamp",
                "indexed": false
            }
        ]
    },
    {
        "type": "function",
        "name": "ID",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [],
        "outputs": [
            {
                "type": "uint256",
                "name": ""
            }
        ]
    },
    {
        "type": "function",
        "name": "_init",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "tuple",
                "name": "_tc",
                "components": [
                    {
                        "type": "uint256",
                        "name": "entryFee"
                    },
                    {
                        "type": "uint256",
                        "name": "MAX_PARTICIPANTS"
                    },
                    {
                        "type": "address",
                        "name": "owner"
                    },
                    {
                        "type": "address",
                        "name": "tradingCompetition"
                    },
                    {
                        "type": "string",
                        "name": "name"
                    },
                    {
                        "type": "string",
                        "name": "description"
                    },
                    {
                        "type": "tuple",
                        "name": "timestamp",
                        "components": [
                            {
                                "type": "uint256",
                                "name": "startTimestamp"
                            },
                            {
                                "type": "uint256",
                                "name": "endTimestamp"
                            },
                            {
                                "type": "uint256",
                                "name": "registrationStart"
                            },
                            {
                                "type": "uint256",
                                "name": "registrationEnd"
                            }
                        ]
                    },
                    {
                        "type": "uint8",
                        "name": "market"
                    },
                    {
                        "type": "tuple",
                        "name": "prize",
                        "components": [
                            {
                                "type": "bool",
                                "name": "win_type"
                            },
                            {
                                "type": "uint256[]",
                                "name": "weights"
                            },
                            {
                                "type": "uint256",
                                "name": "totalPrize"
                            },
                            {
                                "type": "uint256",
                                "name": "owner_fee"
                            },
                            {
                                "type": "address",
                                "name": "token"
                            },
                            {
                                "type": "uint256",
                                "name": "host_contribution"
                            }
                        ]
                    },
                    {
                        "type": "tuple",
                        "name": "competitionRules",
                        "components": [
                            {
                                "type": "uint256",
                                "name": "starting_balance"
                            },
                            {
                                "type": "address",
                                "name": "winning_token"
                            },
                            {
                                "type": "address[]",
                                "name": "tradingTokens"
                            }
                        ]
                    }
                ]
            }
        ],
        "outputs": [
            {
                "type": "bool",
                "name": ""
            }
        ]
    },
    {
        "type": "function",
        "name": "claimOwnerFee",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "to"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "claimPrize",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "to"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "claimable",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "who"
            }
        ],
        "outputs": [
            {
                "type": "uint256",
                "name": "amount"
            },
            {
                "type": "address",
                "name": "token"
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
                "name": "amount"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "getPNLOf",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "who"
            }
        ],
        "outputs": [
            {
                "type": "int256",
                "name": ""
            }
        ]
    },
    {
        "type": "function",
        "name": "increasePrize",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "uint256",
                "name": "amount"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "init",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [],
        "outputs": [
            {
                "type": "bool",
                "name": ""
            }
        ]
    },
    {
        "type": "function",
        "name": "isRegistered",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "_who"
            }
        ],
        "outputs": [
            {
                "type": "bool",
                "name": ""
            }
        ]
    },
    {
        "type": "function",
        "name": "isWinner",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "who"
            }
        ],
        "outputs": [
            {
                "type": "bool",
                "name": "answer"
            },
            {
                "type": "uint256",
                "name": "placement"
            }
        ]
    },
    {
        "type": "function",
        "name": "manager",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [],
        "outputs": [
            {
                "type": "address",
                "name": ""
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
                "type": "address",
                "name": ""
            }
        ]
    },
    {
        "type": "function",
        "name": "register",
        "constant": false,
        "payable": false,
        "inputs": [],
        "outputs": []
    },
    {
        "type": "function",
        "name": "registerAndDeposit",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "uint256",
                "name": "amount"
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
                "name": "caller"
            },
            {
                "type": "tuple",
                "name": "desc",
                "components": [
                    {
                        "type": "address",
                        "name": "srcToken"
                    },
                    {
                        "type": "address",
                        "name": "dstToken"
                    },
                    {
                        "type": "address",
                        "name": "srcReceiver"
                    },
                    {
                        "type": "address",
                        "name": "dstReceiver"
                    },
                    {
                        "type": "uint256",
                        "name": "amount"
                    },
                    {
                        "type": "uint256",
                        "name": "minReturnAmount"
                    },
                    {
                        "type": "uint256",
                        "name": "guaranteedAmount"
                    },
                    {
                        "type": "uint256",
                        "name": "flags"
                    },
                    {
                        "type": "address",
                        "name": "referrer"
                    },
                    {
                        "type": "bytes",
                        "name": "permit"
                    }
                ]
            },
            {
                "type": "tuple[]",
                "name": "calls",
                "components": [
                    {
                        "type": "uint256",
                        "name": "target"
                    },
                    {
                        "type": "uint256",
                        "name": "gasLimit"
                    },
                    {
                        "type": "uint256",
                        "name": "value"
                    },
                    {
                        "type": "bytes",
                        "name": "data"
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
        "name": "timestamp",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [],
        "outputs": [
            {
                "type": "uint256",
                "name": "startTimestamp"
            },
            {
                "type": "uint256",
                "name": "endTimestamp"
            },
            {
                "type": "uint256",
                "name": "registrationStart"
            },
            {
                "type": "uint256",
                "name": "registrationEnd"
            }
        ]
    },
    {
        "type": "function",
        "name": "tradingCompetition",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [],
        "outputs": [
            {
                "type": "tuple",
                "name": "",
                "components": [
                    {
                        "type": "uint256",
                        "name": "entryFee"
                    },
                    {
                        "type": "uint256",
                        "name": "MAX_PARTICIPANTS"
                    },
                    {
                        "type": "address",
                        "name": "owner"
                    },
                    {
                        "type": "address",
                        "name": "tradingCompetition"
                    },
                    {
                        "type": "string",
                        "name": "name"
                    },
                    {
                        "type": "string",
                        "name": "description"
                    },
                    {
                        "type": "tuple",
                        "name": "timestamp",
                        "components": [
                            {
                                "type": "uint256",
                                "name": "startTimestamp"
                            },
                            {
                                "type": "uint256",
                                "name": "endTimestamp"
                            },
                            {
                                "type": "uint256",
                                "name": "registrationStart"
                            },
                            {
                                "type": "uint256",
                                "name": "registrationEnd"
                            }
                        ]
                    },
                    {
                        "type": "uint8",
                        "name": "market"
                    },
                    {
                        "type": "tuple",
                        "name": "prize",
                        "components": [
                            {
                                "type": "bool",
                                "name": "win_type"
                            },
                            {
                                "type": "uint256[]",
                                "name": "weights"
                            },
                            {
                                "type": "uint256",
                                "name": "totalPrize"
                            },
                            {
                                "type": "uint256",
                                "name": "owner_fee"
                            },
                            {
                                "type": "address",
                                "name": "token"
                            },
                            {
                                "type": "uint256",
                                "name": "host_contribution"
                            }
                        ]
                    },
                    {
                        "type": "tuple",
                        "name": "competitionRules",
                        "components": [
                            {
                                "type": "uint256",
                                "name": "starting_balance"
                            },
                            {
                                "type": "address",
                                "name": "winning_token"
                            },
                            {
                                "type": "address[]",
                                "name": "tradingTokens"
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        "type": "function",
        "name": "tradingTokens",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [],
        "outputs": [
            {
                "type": "address[]",
                "name": ""
            }
        ]
    },
    {
        "type": "function",
        "name": "user",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "_who"
            }
        ],
        "outputs": [
            {
                "type": "tuple",
                "name": "userinfo",
                "components": [
                    {
                        "type": "uint256",
                        "name": "startBalance"
                    },
                    {
                        "type": "uint256[]",
                        "name": "tokenBalance"
                    }
                ]
            }
        ]
    },
    {
        "type": "function",
        "name": "userBalance",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "who"
            }
        ],
        "outputs": [
            {
                "type": "uint256[]",
                "name": "amounts"
            },
            {
                "type": "address[]",
                "name": "tokens"
            }
        ]
    },
    {
        "type": "function",
        "name": "users",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [],
        "outputs": [
            {
                "type": "address[]",
                "name": ""
            }
        ]
    },
    {
        "type": "function",
        "name": "winnersList",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [
            {
                "type": "uint256",
                "name": ""
            }
        ],
        "outputs": [
            {
                "type": "address",
                "name": ""
            }
        ]
    },
    {
        "type": "function",
        "name": "withdrawAllFunds",
        "constant": false,
        "payable": false,
        "inputs": [],
        "outputs": []
    },
    {
        "type": "function",
        "name": "withdrawFunds",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "_token"
            },
            {
                "type": "uint256",
                "name": "_amount"
            }
        ],
        "outputs": []
    }
]
