export const ABI_JSON = [
    {
        "type": "constructor",
        "stateMutability": "undefined",
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "_poolDeployer"
            },
            {
                "type": "address",
                "name": "_vaultAddress"
            }
        ]
    },
    {
        "type": "event",
        "anonymous": false,
        "name": "FarmingAddress",
        "inputs": [
            {
                "type": "address",
                "name": "newFarmingAddress",
                "indexed": true
            }
        ]
    },
    {
        "type": "event",
        "anonymous": false,
        "name": "FeeConfiguration",
        "inputs": [
            {
                "type": "uint16",
                "name": "alpha1",
                "indexed": false
            },
            {
                "type": "uint16",
                "name": "alpha2",
                "indexed": false
            },
            {
                "type": "uint32",
                "name": "beta1",
                "indexed": false
            },
            {
                "type": "uint32",
                "name": "beta2",
                "indexed": false
            },
            {
                "type": "uint16",
                "name": "gamma1",
                "indexed": false
            },
            {
                "type": "uint16",
                "name": "gamma2",
                "indexed": false
            },
            {
                "type": "uint32",
                "name": "volumeBeta",
                "indexed": false
            },
            {
                "type": "uint16",
                "name": "volumeGamma",
                "indexed": false
            },
            {
                "type": "uint16",
                "name": "baseFee",
                "indexed": false
            }
        ]
    },
    {
        "type": "event",
        "anonymous": false,
        "name": "Owner",
        "inputs": [
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
        "name": "Pool",
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
                "type": "address",
                "name": "pool",
                "indexed": false
            }
        ]
    },
    {
        "type": "event",
        "anonymous": false,
        "name": "VaultAddress",
        "inputs": [
            {
                "type": "address",
                "name": "newVaultAddress",
                "indexed": true
            }
        ]
    },
    {
        "type": "function",
        "name": "baseFeeConfiguration",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [],
        "outputs": [
            {
                "type": "uint16",
                "name": "alpha1"
            },
            {
                "type": "uint16",
                "name": "alpha2"
            },
            {
                "type": "uint32",
                "name": "beta1"
            },
            {
                "type": "uint32",
                "name": "beta2"
            },
            {
                "type": "uint16",
                "name": "gamma1"
            },
            {
                "type": "uint16",
                "name": "gamma2"
            },
            {
                "type": "uint32",
                "name": "volumeBeta"
            },
            {
                "type": "uint16",
                "name": "volumeGamma"
            },
            {
                "type": "uint16",
                "name": "baseFee"
            }
        ]
    },
    {
        "type": "function",
        "name": "createPool",
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
            }
        ],
        "outputs": [
            {
                "type": "address",
                "name": "pool"
            }
        ]
    },
    {
        "type": "function",
        "name": "farmingAddress",
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
        "name": "poolByPair",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [
            {
                "type": "address"
            },
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
        "name": "setBaseFeeConfiguration",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "uint16",
                "name": "alpha1"
            },
            {
                "type": "uint16",
                "name": "alpha2"
            },
            {
                "type": "uint32",
                "name": "beta1"
            },
            {
                "type": "uint32",
                "name": "beta2"
            },
            {
                "type": "uint16",
                "name": "gamma1"
            },
            {
                "type": "uint16",
                "name": "gamma2"
            },
            {
                "type": "uint32",
                "name": "volumeBeta"
            },
            {
                "type": "uint16",
                "name": "volumeGamma"
            },
            {
                "type": "uint16",
                "name": "baseFee"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "setFarmingAddress",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "_farmingAddress"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "setOwner",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "_owner"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "setVaultAddress",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "_vaultAddress"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "vaultAddress",
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
