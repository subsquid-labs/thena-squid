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
        "name": "AddCreator",
        "inputs": [
            {
                "type": "address",
                "name": "creator",
                "indexed": true
            },
            {
                "type": "uint256",
                "name": "blocktimestamp",
                "indexed": false
            }
        ]
    },
    {
        "type": "event",
        "anonymous": false,
        "name": "AddToken",
        "inputs": [
            {
                "type": "address",
                "name": "token",
                "indexed": true
            },
            {
                "type": "uint256",
                "name": "blocktimestamp",
                "indexed": false
            }
        ]
    },
    {
        "type": "event",
        "anonymous": false,
        "name": "Create",
        "inputs": [
            {
                "type": "tuple",
                "name": "tradingCompetition",
                "indexed": true,
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
                                "type": "uint256[]",
                                "name": "totalPrize"
                            },
                            {
                                "type": "uint256",
                                "name": "owner_fee"
                            },
                            {
                                "type": "address[]",
                                "name": "token"
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
            },
            {
                "type": "address",
                "name": "caller",
                "indexed": true
            },
            {
                "type": "uint256",
                "name": "blocktimestamp",
                "indexed": false
            }
        ]
    },
    {
        "type": "event",
        "anonymous": false,
        "name": "OwnershipTransferred",
        "inputs": [
            {
                "type": "address",
                "name": "previousOwner",
                "indexed": true
            },
            {
                "type": "address",
                "name": "newOwner",
                "indexed": true
            }
        ]
    },
    {
        "type": "event",
        "anonymous": false,
        "name": "RemoveCreator",
        "inputs": [
            {
                "type": "address",
                "name": "creator",
                "indexed": true
            },
            {
                "type": "uint256",
                "name": "blocktimestamp",
                "indexed": false
            }
        ]
    },
    {
        "type": "event",
        "anonymous": false,
        "name": "RemoveToken",
        "inputs": [
            {
                "type": "address",
                "name": "token",
                "indexed": true
            },
            {
                "type": "uint256",
                "name": "blocktimestamp",
                "indexed": false
            }
        ]
    },
    {
        "type": "event",
        "anonymous": false,
        "name": "SetMaxPlacements",
        "inputs": [
            {
                "type": "uint256",
                "name": "oldAmount",
                "indexed": true
            },
            {
                "type": "uint256",
                "name": "newAmount",
                "indexed": false
            },
            {
                "type": "uint256",
                "name": "blocktimestamp",
                "indexed": false
            }
        ]
    },
    {
        "type": "event",
        "anonymous": false,
        "name": "SetMaxUsers",
        "inputs": [
            {
                "type": "uint256",
                "name": "oldAmount",
                "indexed": true
            },
            {
                "type": "uint256",
                "name": "newAmount",
                "indexed": false
            },
            {
                "type": "uint256",
                "name": "blocktimestamp",
                "indexed": false
            }
        ]
    },
    {
        "type": "event",
        "anonymous": false,
        "name": "SetPermissionlessCreation",
        "inputs": [
            {
                "type": "bool",
                "name": "status",
                "indexed": true
            },
            {
                "type": "uint256",
                "name": "blocktimestamp",
                "indexed": false
            }
        ]
    },
    {
        "type": "event",
        "anonymous": false,
        "name": "SetPerpetualFactory",
        "inputs": [
            {
                "type": "address",
                "name": "old",
                "indexed": true
            },
            {
                "type": "address",
                "name": "newFactory",
                "indexed": false
            },
            {
                "type": "uint256",
                "name": "blocktimestamp",
                "indexed": false
            }
        ]
    },
    {
        "type": "event",
        "anonymous": false,
        "name": "SetProtocolFee",
        "inputs": [
            {
                "type": "uint256",
                "name": "oldAmount",
                "indexed": true
            },
            {
                "type": "uint256",
                "name": "newAmount",
                "indexed": false
            },
            {
                "type": "uint256",
                "name": "blocktimestamp",
                "indexed": false
            }
        ]
    },
    {
        "type": "event",
        "anonymous": false,
        "name": "SetProtocolFeeToken",
        "inputs": [
            {
                "type": "address",
                "name": "oldtoken",
                "indexed": true
            },
            {
                "type": "address",
                "name": "newToken",
                "indexed": false
            },
            {
                "type": "uint256",
                "name": "blocktimestamp",
                "indexed": false
            }
        ]
    },
    {
        "type": "event",
        "anonymous": false,
        "name": "SetRouter",
        "inputs": [
            {
                "type": "address",
                "name": "old",
                "indexed": true
            },
            {
                "type": "address",
                "name": "newRouter",
                "indexed": false
            },
            {
                "type": "uint256",
                "name": "blocktimestamp",
                "indexed": false
            }
        ]
    },
    {
        "type": "event",
        "anonymous": false,
        "name": "SetSpotFactory",
        "inputs": [
            {
                "type": "address",
                "name": "old",
                "indexed": true
            },
            {
                "type": "address",
                "name": "newFactory",
                "indexed": false
            },
            {
                "type": "uint256",
                "name": "blocktimestamp",
                "indexed": false
            }
        ]
    },
    {
        "type": "event",
        "anonymous": false,
        "name": "SetTreasury",
        "inputs": [
            {
                "type": "address",
                "name": "oldTreasury",
                "indexed": true
            },
            {
                "type": "address",
                "name": "newTreasury",
                "indexed": false
            },
            {
                "type": "uint256",
                "name": "blocktimestamp",
                "indexed": false
            }
        ]
    },
    {
        "type": "function",
        "name": "MAX_OWNER_FEE",
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
        "name": "MAX_PLACEMENTS",
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
        "name": "MAX_TOKEN_PRIZE",
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
        "name": "MAX_USERS",
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
        "name": "PRECISION",
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
        "name": "addCreator",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "address[]",
                "name": "_creator"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "addToken",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "address[]",
                "name": "_token"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "allowedTokenForPrize",
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
        "name": "create",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "tuple",
                "name": "_tradingCompetition",
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
                                "type": "uint256[]",
                                "name": "totalPrize"
                            },
                            {
                                "type": "uint256",
                                "name": "owner_fee"
                            },
                            {
                                "type": "address[]",
                                "name": "token"
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
        "outputs": []
    },
    {
        "type": "function",
        "name": "idCounter",
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
        "name": "idToTradingCompetition",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [
            {
                "type": "uint256",
                "name": "_id"
            }
        ],
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
                                "type": "uint256[]",
                                "name": "totalPrize"
                            },
                            {
                                "type": "uint256",
                                "name": "owner_fee"
                            },
                            {
                                "type": "address[]",
                                "name": "token"
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
        "name": "isAllowedCreator",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": ""
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
        "name": "isAllowedToken",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": ""
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
        "name": "isPermissionless",
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
        "name": "perpetualFactory",
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
        "name": "protocol_fee",
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
        "name": "protocol_fee_token",
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
        "name": "protocol_fee_treasury",
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
        "name": "removeCreator",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "address[]",
                "name": "_creator"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "removeToken",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "address[]",
                "name": "_token"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "renounceOwnership",
        "constant": false,
        "payable": false,
        "inputs": [],
        "outputs": []
    },
    {
        "type": "function",
        "name": "router",
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
        "name": "setMaxPlacements",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "uint256",
                "name": "_MAX_PLACEMENTS"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "setMaxUsers",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "uint256",
                "name": "_MAX_USERS"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "setPermissionlessCreation",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "bool",
                "name": "_type"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "setPerpetualFactory",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "_perpetualFactory"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "setProtocolFee",
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
        "name": "setProtocolFeeToken",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "token"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "setRouter",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "_newRouter"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "setSpotFactory",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "_spotFactory"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "setTreasury",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "_treasury"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "spotFactory",
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
    }
]
