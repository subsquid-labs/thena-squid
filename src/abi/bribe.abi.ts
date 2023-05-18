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
                "name": "_voter"
            },
            {
                "type": "address",
                "name": "_bribeFactory"
            },
            {
                "type": "string",
                "name": "_type"
            }
        ]
    },
    {
        "type": "event",
        "anonymous": false,
        "name": "Recovered",
        "inputs": [
            {
                "type": "address",
                "name": "token",
                "indexed": false
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
        "name": "RewardAdded",
        "inputs": [
            {
                "type": "address",
                "name": "rewardToken",
                "indexed": false
            },
            {
                "type": "uint256",
                "name": "reward",
                "indexed": false
            },
            {
                "type": "uint256",
                "name": "startTimestamp",
                "indexed": false
            }
        ]
    },
    {
        "type": "event",
        "anonymous": false,
        "name": "RewardPaid",
        "inputs": [
            {
                "type": "address",
                "name": "user",
                "indexed": true
            },
            {
                "type": "address",
                "name": "rewardsToken",
                "indexed": true
            },
            {
                "type": "uint256",
                "name": "reward",
                "indexed": false
            }
        ]
    },
    {
        "type": "event",
        "anonymous": false,
        "name": "Staked",
        "inputs": [
            {
                "type": "uint256",
                "name": "tokenId",
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
        "name": "Withdrawn",
        "inputs": [
            {
                "type": "uint256",
                "name": "tokenId",
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
        "type": "function",
        "name": "TYPE",
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
        "name": "WEEK",
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
        "name": "_deposit",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "uint256",
                "name": "amount"
            },
            {
                "type": "uint256",
                "name": "tokenId"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "_totalSupply",
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
        "name": "_withdraw",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "uint256",
                "name": "amount"
            },
            {
                "type": "uint256",
                "name": "tokenId"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "addReward",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "_rewardsToken"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "addRewards",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "address[]",
                "name": "_rewardsToken"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "balanceOf",
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
        "name": "balanceOfAt",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [
            {
                "type": "uint256",
                "name": "tokenId"
            },
            {
                "type": "uint256",
                "name": "_timestamp"
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
        "name": "balanceOfOwner",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "_owner"
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
        "name": "balanceOfOwnerAt",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "_owner"
            },
            {
                "type": "uint256",
                "name": "_timestamp"
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
        "name": "bribeFactory",
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
        "name": "earned",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "_owner"
            },
            {
                "type": "address",
                "name": "_rewardToken"
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
        "name": "earned",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [
            {
                "type": "uint256",
                "name": "tokenId"
            },
            {
                "type": "address",
                "name": "_rewardToken"
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
        "name": "emergencyRecoverERC20",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "tokenAddress"
            },
            {
                "type": "uint256",
                "name": "tokenAmount"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "firstBribeTimestamp",
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
        "name": "getEpochStart",
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
        "name": "getNextEpochStart",
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
        "name": "getReward",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "address[]",
                "name": "tokens"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "getReward",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "uint256",
                "name": "tokenId"
            },
            {
                "type": "address[]",
                "name": "tokens"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "getRewardForAddress",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "_owner"
            },
            {
                "type": "address[]",
                "name": "tokens"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "getRewardForOwner",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "uint256",
                "name": "tokenId"
            },
            {
                "type": "address[]",
                "name": "tokens"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "isRewardToken",
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
                "type": "address",
                "name": "_rewardsToken"
            },
            {
                "type": "uint256",
                "name": "reward"
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
        "name": "recoverERC20AndUpdateData",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "tokenAddress"
            },
            {
                "type": "uint256",
                "name": "tokenAmount"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "rewardData",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [
            {
                "type": "address"
            },
            {
                "type": "uint256"
            }
        ],
        "outputs": [
            {
                "type": "uint256",
                "name": "periodFinish"
            },
            {
                "type": "uint256",
                "name": "rewardsPerEpoch"
            },
            {
                "type": "uint256",
                "name": "lastUpdateTime"
            }
        ]
    },
    {
        "type": "function",
        "name": "rewardPerToken",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "_rewardsToken"
            },
            {
                "type": "uint256",
                "name": "_timestmap"
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
        "name": "rewardTokens",
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
        "name": "rewardsListLength",
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
        "name": "totalSupplyAt",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [
            {
                "type": "uint256",
                "name": "_timestamp"
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
        "name": "userRewardPerTokenPaid",
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
                "type": "uint256"
            }
        ]
    },
    {
        "type": "function",
        "name": "userTimestamp",
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
                "type": "uint256"
            }
        ]
    },
    {
        "type": "function",
        "name": "ve",
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
