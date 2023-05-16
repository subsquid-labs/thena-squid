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
        "name": "Abstained",
        "inputs": [
            {
                "type": "uint256",
                "name": "tokenId",
                "indexed": false
            },
            {
                "type": "uint256",
                "name": "weight",
                "indexed": false
            }
        ]
    },
    {
        "type": "event",
        "anonymous": false,
        "name": "Attach",
        "inputs": [
            {
                "type": "address",
                "name": "owner",
                "indexed": true
            },
            {
                "type": "address",
                "name": "gauge",
                "indexed": true
            },
            {
                "type": "uint256",
                "name": "tokenId",
                "indexed": false
            }
        ]
    },
    {
        "type": "event",
        "anonymous": false,
        "name": "Blacklisted",
        "inputs": [
            {
                "type": "address",
                "name": "blacklister",
                "indexed": true
            },
            {
                "type": "address",
                "name": "token",
                "indexed": true
            }
        ]
    },
    {
        "type": "event",
        "anonymous": false,
        "name": "Detach",
        "inputs": [
            {
                "type": "address",
                "name": "owner",
                "indexed": true
            },
            {
                "type": "address",
                "name": "gauge",
                "indexed": true
            },
            {
                "type": "uint256",
                "name": "tokenId",
                "indexed": false
            }
        ]
    },
    {
        "type": "event",
        "anonymous": false,
        "name": "DistributeReward",
        "inputs": [
            {
                "type": "address",
                "name": "sender",
                "indexed": true
            },
            {
                "type": "address",
                "name": "gauge",
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
        "name": "GaugeCreated",
        "inputs": [
            {
                "type": "address",
                "name": "gauge",
                "indexed": true
            },
            {
                "type": "address",
                "name": "creator",
                "indexed": false
            },
            {
                "type": "address",
                "name": "internal_bribe",
                "indexed": false
            },
            {
                "type": "address",
                "name": "external_bribe",
                "indexed": true
            },
            {
                "type": "address",
                "name": "pool",
                "indexed": true
            }
        ]
    },
    {
        "type": "event",
        "anonymous": false,
        "name": "GaugeKilled",
        "inputs": [
            {
                "type": "address",
                "name": "gauge",
                "indexed": true
            }
        ]
    },
    {
        "type": "event",
        "anonymous": false,
        "name": "GaugeRevived",
        "inputs": [
            {
                "type": "address",
                "name": "gauge",
                "indexed": true
            }
        ]
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
        "name": "NotifyReward",
        "inputs": [
            {
                "type": "address",
                "name": "sender",
                "indexed": true
            },
            {
                "type": "address",
                "name": "reward",
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
        "name": "Voted",
        "inputs": [
            {
                "type": "address",
                "name": "voter",
                "indexed": true
            },
            {
                "type": "uint256",
                "name": "tokenId",
                "indexed": false
            },
            {
                "type": "uint256",
                "name": "weight",
                "indexed": false
            }
        ]
    },
    {
        "type": "event",
        "anonymous": false,
        "name": "Whitelisted",
        "inputs": [
            {
                "type": "address",
                "name": "whitelister",
                "indexed": true
            },
            {
                "type": "address",
                "name": "token",
                "indexed": true
            }
        ]
    },
    {
        "type": "function",
        "name": "MAX_VOTE_DELAY",
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
        "name": "VOTE_DELAY",
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
        "name": "_epochTimestamp",
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
        "name": "_factories",
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
        "name": "_gaugeFactories",
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
        "name": "_init",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "address[]",
                "name": "_tokens"
            },
            {
                "type": "address",
                "name": "_permissionsRegistry"
            },
            {
                "type": "address",
                "name": "_minter"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "_notifyRewardAmount",
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
        "name": "_ve",
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
        "name": "addFactory",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "_pairFactory"
            },
            {
                "type": "address",
                "name": "_gaugeFactory"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "attachTokenToGauge",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "uint256",
                "name": "tokenId"
            },
            {
                "type": "address",
                "name": "account"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "blacklist",
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
        "name": "bribefactory",
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
        "name": "claimBribes",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "address[]",
                "name": "_bribes"
            },
            {
                "type": "address[][]",
                "name": "_tokens"
            },
            {
                "type": "uint256",
                "name": "_tokenId"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "claimBribes",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "address[]",
                "name": "_bribes"
            },
            {
                "type": "address[][]",
                "name": "_tokens"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "claimFees",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "address[]",
                "name": "_fees"
            },
            {
                "type": "address[][]",
                "name": "_tokens"
            },
            {
                "type": "uint256",
                "name": "_tokenId"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "claimFees",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "address[]",
                "name": "_bribes"
            },
            {
                "type": "address[][]",
                "name": "_tokens"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "claimRewards",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "address[]",
                "name": "_gauges"
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
                "type": "address"
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
        "name": "createGauge",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "_pool"
            },
            {
                "type": "uint256",
                "name": "_gaugeType"
            }
        ],
        "outputs": [
            {
                "type": "address",
                "name": "_gauge"
            },
            {
                "type": "address",
                "name": "_internal_bribe"
            },
            {
                "type": "address",
                "name": "_external_bribe"
            }
        ]
    },
    {
        "type": "function",
        "name": "createGauges",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "address[]",
                "name": "_pool"
            },
            {
                "type": "uint256[]",
                "name": "_gaugeTypes"
            }
        ],
        "outputs": [
            {
                "type": "address[]"
            },
            {
                "type": "address[]"
            },
            {
                "type": "address[]"
            }
        ]
    },
    {
        "type": "function",
        "name": "detachTokenFromGauge",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "uint256",
                "name": "tokenId"
            },
            {
                "type": "address",
                "name": "account"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "distribute",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "address[]",
                "name": "_gauges"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "distribute",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "uint256",
                "name": "start"
            },
            {
                "type": "uint256",
                "name": "finish"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "distributeAll",
        "constant": false,
        "payable": false,
        "inputs": [],
        "outputs": []
    },
    {
        "type": "function",
        "name": "distributeFees",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "address[]",
                "name": "_gauges"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "external_bribes",
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
                "type": "address"
            }
        ]
    },
    {
        "type": "function",
        "name": "factories",
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
        "name": "factoryLength",
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
        "name": "forceResetTo",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "uint256",
                "name": "_tokenId"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "gaugeFactories",
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
        "name": "gaugeFactoriesLength",
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
        "name": "gaugefactory",
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
        "name": "gauges",
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
                "type": "address"
            }
        ]
    },
    {
        "type": "function",
        "name": "gaugesDistributionTimestmap",
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
                "type": "uint256"
            }
        ]
    },
    {
        "type": "function",
        "name": "increaseGaugeApprovals",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "_gauge"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "initialize",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "__ve"
            },
            {
                "type": "address",
                "name": "_factory"
            },
            {
                "type": "address",
                "name": "_gauges"
            },
            {
                "type": "address",
                "name": "_bribes"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "internal_bribes",
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
                "type": "address"
            }
        ]
    },
    {
        "type": "function",
        "name": "isAlive",
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
        "name": "isFactory",
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
        "name": "isGauge",
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
        "name": "isGaugeFactory",
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
        "name": "isWhitelisted",
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
        "name": "killGauge",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "_gauge"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "killGaugeTotally",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "_gauge"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "lastVoted",
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
                "type": "uint256"
            }
        ]
    },
    {
        "type": "function",
        "name": "length",
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
        "name": "minter",
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
        "name": "notifyRewardAmount",
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
        "name": "permissionRegistry",
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
        "name": "poke",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "uint256",
                "name": "_tokenId"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "poolForGauge",
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
                "type": "address"
            }
        ]
    },
    {
        "type": "function",
        "name": "poolVote",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [
            {
                "type": "uint256"
            },
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
        "name": "poolVoteLength",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [
            {
                "type": "uint256",
                "name": "tokenId"
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
        "name": "pools",
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
        "name": "removeFactory",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "uint256",
                "name": "_pos"
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
        "name": "replaceFactory",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "_pairFactory"
            },
            {
                "type": "address",
                "name": "_gaugeFactory"
            },
            {
                "type": "uint256",
                "name": "_pos"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "reset",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "uint256",
                "name": "_tokenId"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "reviveGauge",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "_gauge"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "setBribeFactory",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "_bribeFactory"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "setExternalBribeFor",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "_gauge"
            },
            {
                "type": "address",
                "name": "_external"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "setGaugeFactory",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "_gaugeFactory"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "setInternalBribeFor",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "_gauge"
            },
            {
                "type": "address",
                "name": "_internal"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "setMinter",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "_minter"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "setNewBribes",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "_gauge"
            },
            {
                "type": "address",
                "name": "_internal"
            },
            {
                "type": "address",
                "name": "_external"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "setPairFactory",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "_factory"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "setPermissionsRegistry",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "_permissionRegistry"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "setVoteDelay",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "uint256",
                "name": "_delay"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "totalWeight",
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
        "name": "totalWeightAt",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [
            {
                "type": "uint256",
                "name": "_time"
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
        "name": "updateAll",
        "constant": false,
        "payable": false,
        "inputs": [],
        "outputs": []
    },
    {
        "type": "function",
        "name": "updateFor",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "address[]",
                "name": "_gauges"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "updateForRange",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "uint256",
                "name": "start"
            },
            {
                "type": "uint256",
                "name": "end"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "usedWeights",
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
                "type": "uint256"
            }
        ]
    },
    {
        "type": "function",
        "name": "vote",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "uint256",
                "name": "_tokenId"
            },
            {
                "type": "address[]",
                "name": "_poolVote"
            },
            {
                "type": "uint256[]",
                "name": "_weights"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "votes",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [
            {
                "type": "uint256"
            },
            {
                "type": "address"
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
        "name": "weights",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "_pool"
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
        "name": "weightsAt",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "_pool"
            },
            {
                "type": "uint256",
                "name": "_time"
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
        "name": "whitelist",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "address[]",
                "name": "_token"
            }
        ],
        "outputs": []
    }
]
