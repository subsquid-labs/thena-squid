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
        "type": "function",
        "name": "activateEmergencyMode",
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
        "name": "createGaugeV2",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "_rewardToken"
            },
            {
                "type": "address",
                "name": "_ve"
            },
            {
                "type": "address",
                "name": "_token"
            },
            {
                "type": "address",
                "name": "_distribution"
            },
            {
                "type": "address",
                "name": "_internal_bribe"
            },
            {
                "type": "address",
                "name": "_external_bribe"
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
        "name": "gammaFeeRecipient",
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
        "inputs": [],
        "outputs": [
            {
                "type": "address[]"
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
                "type": "address",
                "name": "_permissionsRegistry"
            },
            {
                "type": "address",
                "name": "_gammaFeeRecipient"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "last_feeVault",
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
        "name": "last_gauge",
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
        "name": "permissionsRegistry",
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
        "name": "setDistribution",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "address[]",
                "name": "_gauges"
            },
            {
                "type": "address",
                "name": "distro"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "setGammaDefaultFeeRecipient",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "_rec"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "setGaugeFeeVault",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "address[]",
                "name": "_gauges"
            },
            {
                "type": "address",
                "name": "_vault"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "setGaugeRewarder",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "address[]",
                "name": "_gauges"
            },
            {
                "type": "address[]",
                "name": "_rewarder"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "setInternalBribe",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "address[]",
                "name": "_gauges"
            },
            {
                "type": "address[]",
                "name": "int_bribe"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "setRegistry",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "_registry"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "setRewarderPid",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "address[]",
                "name": "_gauges"
            },
            {
                "type": "uint256[]",
                "name": "_pids"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "stopEmergencyMode",
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
