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
        "name": "Initialized",
        "inputs": [
            {
                "type": "uint8",
                "name": "version",
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
        "name": "PairCreated",
        "inputs": [
            {
                "type": "address",
                "name": "token0",
                "indexed": true
            },
            {
                "type": "address",
                "name": "token1",
                "indexed": true
            },
            {
                "type": "bool",
                "name": "stable",
                "indexed": false
            },
            {
                "type": "address",
                "name": "pair",
                "indexed": false
            },
            {
                "type": "uint256",
                "indexed": false
            }
        ]
    },
    {
        "type": "function",
        "name": "MAX_FEE",
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
        "name": "MAX_REFERRAL_FEE",
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
        "name": "acceptFeeManager",
        "constant": false,
        "payable": false,
        "inputs": [],
        "outputs": []
    },
    {
        "type": "function",
        "name": "allPairs",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [
            {
                "type": "uint256"
            }
        ],
        "outputs": [
            {
                "type": "address"
            }
        ]
    },
    {
        "type": "function",
        "name": "allPairsLength",
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
        "name": "createPair",
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
        "name": "dibs",
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
        "name": "feeManager",
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
        "name": "getFee",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [
            {
                "type": "bool",
                "name": "_stable"
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
        "name": "getInitializable",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [],
        "outputs": [
            {
                "type": "address"
            },
            {
                "type": "address"
            },
            {
                "type": "bool"
            }
        ]
    },
    {
        "type": "function",
        "name": "getPair",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [
            {
                "type": "address"
            },
            {
                "type": "address"
            },
            {
                "type": "bool"
            }
        ],
        "outputs": [
            {
                "type": "address"
            }
        ]
    },
    {
        "type": "function",
        "name": "initialize",
        "constant": false,
        "payable": false,
        "inputs": [],
        "outputs": []
    },
    {
        "type": "function",
        "name": "isPair",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [
            {
                "type": "address"
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
        "name": "isPaused",
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
        "name": "pairCodeHash",
        "constant": true,
        "stateMutability": "pure",
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
        "name": "pairs",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [],
        "outputs": [
            {
                "type": "address[]"
            }
        ]
    },
    {
        "type": "function",
        "name": "pendingFeeManager",
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
        "name": "renounceOwnership",
        "constant": false,
        "payable": false,
        "inputs": [],
        "outputs": []
    },
    {
        "type": "function",
        "name": "setDibs",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "_dibs"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "setFee",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "bool",
                "name": "_stable"
            },
            {
                "type": "uint256",
                "name": "_fee"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "setFeeManager",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "_feeManager"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "setPause",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "bool",
                "name": "_state"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "setReferralFee",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "uint256",
                "name": "_refFee"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "setStakingFeeAddress",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "_feehandler"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "setStakingFees",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "uint256",
                "name": "_newFee"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "stableFee",
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
        "name": "stakingFeeHandler",
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
        "name": "stakingNFTFee",
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
        "name": "volatileFee",
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
