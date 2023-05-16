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
        "name": "addRewardToBribe",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "_token"
            },
            {
                "type": "address",
                "name": "__bribe"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "addRewardToBribes",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "_token"
            },
            {
                "type": "address[]",
                "name": "__bribes"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "addRewardsToBribe",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "address[]",
                "name": "_token"
            },
            {
                "type": "address",
                "name": "__bribe"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "addRewardsToBribes",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "address[][]",
                "name": "_token"
            },
            {
                "type": "address[]",
                "name": "__bribes"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "createBribe",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "_owner"
            },
            {
                "type": "address",
                "name": "_token0"
            },
            {
                "type": "address",
                "name": "_token1"
            },
            {
                "type": "string",
                "name": "_type"
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
        "name": "defaultRewardToken",
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
        "name": "initialize",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "_voter"
            },
            {
                "type": "address",
                "name": "_permissionsRegistry"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "last_bribe",
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
        "name": "pushDefaultRewardToken",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "_token"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "recoverERC20AndUpdateData",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "address[]",
                "name": "_bribe"
            },
            {
                "type": "address[]",
                "name": "_tokens"
            },
            {
                "type": "uint256[]",
                "name": "_amounts"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "recoverERC20From",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "address[]",
                "name": "_bribe"
            },
            {
                "type": "address[]",
                "name": "_tokens"
            },
            {
                "type": "uint256[]",
                "name": "_amounts"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "removeDefaultRewardToken",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "address",
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
        "name": "setBribeMinter",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "address[]",
                "name": "_bribe"
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
        "name": "setBribeOwner",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "address[]",
                "name": "_bribe"
            },
            {
                "type": "address",
                "name": "_owner"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "setBribeVoter",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "address[]",
                "name": "_bribe"
            },
            {
                "type": "address",
                "name": "_voter"
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
                "name": "_permReg"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "setVoter",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "_Voter"
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
    },
    {
        "type": "function",
        "name": "voter",
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
