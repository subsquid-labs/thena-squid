export const ABI_JSON = [
    {
        "type": "constructor",
        "stateMutability": "undefined",
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "_artProxy"
            },
            {
                "type": "address",
                "name": "_emojiUtils"
            },
            {
                "type": "string[]",
                "name": "reservedUsernames"
            }
        ]
    },
    {
        "type": "event",
        "anonymous": false,
        "name": "Approval",
        "inputs": [
            {
                "type": "address",
                "name": "owner",
                "indexed": true
            },
            {
                "type": "address",
                "name": "approved",
                "indexed": true
            },
            {
                "type": "uint256",
                "name": "tokenId",
                "indexed": true
            }
        ]
    },
    {
        "type": "event",
        "anonymous": false,
        "name": "ApprovalForAll",
        "inputs": [
            {
                "type": "address",
                "name": "owner",
                "indexed": true
            },
            {
                "type": "address",
                "name": "operator",
                "indexed": true
            },
            {
                "type": "bool",
                "name": "approved",
                "indexed": false
            }
        ]
    },
    {
        "type": "event",
        "anonymous": false,
        "name": "ArtProxyUpdated",
        "inputs": [
            {
                "type": "address",
                "name": "oldArtProxy",
                "indexed": true
            },
            {
                "type": "address",
                "name": "newArtProxy",
                "indexed": true
            }
        ]
    },
    {
        "type": "event",
        "anonymous": false,
        "name": "BatchMetadataUpdate",
        "inputs": [
            {
                "type": "uint256",
                "name": "_fromTokenId",
                "indexed": false
            },
            {
                "type": "uint256",
                "name": "_toTokenId",
                "indexed": false
            }
        ]
    },
    {
        "type": "event",
        "anonymous": false,
        "name": "CostsSet",
        "inputs": [
            {
                "type": "address",
                "name": "token",
                "indexed": true
            },
            {
                "type": "uint256[]",
                "name": "costs"
            }
        ]
    },
    {
        "type": "event",
        "anonymous": false,
        "name": "EmojiUtilsUpdated",
        "inputs": [
            {
                "type": "address",
                "name": "emojIUtils",
                "indexed": true
            },
            {
                "type": "address",
                "name": "newEmojiUtils",
                "indexed": true
            }
        ]
    },
    {
        "type": "event",
        "anonymous": false,
        "name": "ForbiddenCharAdded",
        "inputs": [
            {
                "type": "string",
                "name": "s",
                "indexed": true
            }
        ]
    },
    {
        "type": "event",
        "anonymous": false,
        "name": "ForbiddenCharRemoved",
        "inputs": [
            {
                "type": "string",
                "name": "s",
                "indexed": true
            }
        ]
    },
    {
        "type": "event",
        "anonymous": false,
        "name": "MaxLengthSet",
        "inputs": [
            {
                "type": "uint256",
                "name": "newMaxLength",
                "indexed": true
            }
        ]
    },
    {
        "type": "event",
        "anonymous": false,
        "name": "MetadataUpdate",
        "inputs": [
            {
                "type": "uint256",
                "name": "tokenId",
                "indexed": true
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
        "name": "PaymentTokenAdded",
        "inputs": [
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
        "name": "PaymentTokenRemoved",
        "inputs": [
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
        "name": "TokensWithdrawn",
        "inputs": [
            {
                "type": "address",
                "name": "token",
                "indexed": true
            },
            {
                "type": "address",
                "name": "recipient",
                "indexed": true
            },
            {
                "type": "uint256",
                "name": "amount",
                "indexed": true
            }
        ]
    },
    {
        "type": "event",
        "anonymous": false,
        "name": "TraitAdded",
        "inputs": [
            {
                "type": "address",
                "name": "traitCheckerContract",
                "indexed": true
            },
            {
                "type": "string",
                "name": "traitName",
                "indexed": true
            }
        ]
    },
    {
        "type": "event",
        "anonymous": false,
        "name": "TraitEdited",
        "inputs": [
            {
                "type": "string",
                "name": "traitName",
                "indexed": true
            },
            {
                "type": "address",
                "name": "oldTraitCheckerContract",
                "indexed": true
            },
            {
                "type": "address",
                "name": "newTraitCheckerContract",
                "indexed": true
            }
        ]
    },
    {
        "type": "event",
        "anonymous": false,
        "name": "TraitRemoved",
        "inputs": [
            {
                "type": "string",
                "name": "raitName",
                "indexed": true
            },
            {
                "type": "address",
                "name": "oldTraitCheckerContract",
                "indexed": true
            }
        ]
    },
    {
        "type": "event",
        "anonymous": false,
        "name": "Transfer",
        "inputs": [
            {
                "type": "address",
                "name": "from",
                "indexed": true
            },
            {
                "type": "address",
                "name": "to",
                "indexed": true
            },
            {
                "type": "uint256",
                "name": "tokenId",
                "indexed": true
            }
        ]
    },
    {
        "type": "event",
        "anonymous": false,
        "name": "UsernameMinted",
        "inputs": [
            {
                "type": "uint256",
                "name": "tokenId",
                "indexed": true
            },
            {
                "type": "string",
                "name": "username",
                "indexed": true
            },
            {
                "type": "address",
                "name": "minter",
                "indexed": true
            }
        ]
    },
    {
        "type": "function",
        "name": "MAX_LENGTH",
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
        "name": "MAX_LENGTH_FLAG",
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
        "name": "addPaymentToken",
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
        "name": "addTrait",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "_traitCheckerContract"
            },
            {
                "type": "string",
                "name": "_traitName"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "addTraits",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "address[]",
                "name": "_traitCheckerContracts"
            },
            {
                "type": "string[]",
                "name": "_traitNames"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "admins",
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
        "name": "allowedTokens",
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
        "name": "allowedTokensList",
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
        "name": "approve",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "to"
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
        "name": "artProxy",
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
        "name": "balanceOf",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "owner"
            }
        ],
        "outputs": [
            {
                "type": "uint256",
                "name": ""
            }
        ]
    },
    {
        "type": "function",
        "name": "batchMintUsername",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "string[]",
                "name": "_usernames"
            },
            {
                "type": "address",
                "name": "_paymentToken"
            },
            {
                "type": "string[][]",
                "name": "_rawTraits"
            },
            {
                "type": "bytes32[][][]",
                "name": "_proofs"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "batchMintUsernameFor",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "_to"
            },
            {
                "type": "string[]",
                "name": "_usernames"
            },
            {
                "type": "address",
                "name": "_paymentToken"
            },
            {
                "type": "string[][]",
                "name": "_rawTraits"
            },
            {
                "type": "bytes32[][][]",
                "name": "_proofs"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "costPerToken",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "_token"
            }
        ],
        "outputs": [
            {
                "type": "uint256[]",
                "name": ""
            }
        ]
    },
    {
        "type": "function",
        "name": "editTrait",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "string",
                "name": "_traitName"
            },
            {
                "type": "address",
                "name": "newTraitCheckerContract"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "emojiUtils",
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
        "name": "forbiddenChar",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [],
        "outputs": [
            {
                "type": "string[]",
                "name": ""
            }
        ]
    },
    {
        "type": "function",
        "name": "getApproved",
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
                "type": "address",
                "name": ""
            }
        ]
    },
    {
        "type": "function",
        "name": "getLength",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [
            {
                "type": "string",
                "name": "_username"
            }
        ],
        "outputs": [
            {
                "type": "uint256",
                "name": ""
            }
        ]
    },
    {
        "type": "function",
        "name": "isApprovedForAll",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "owner"
            },
            {
                "type": "address",
                "name": "operator"
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
        "name": "isUsernameAvailable",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [
            {
                "type": "string",
                "name": "username"
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
        "name": "mintUsername",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "string",
                "name": "_username"
            },
            {
                "type": "address",
                "name": "_paymentToken"
            },
            {
                "type": "string[]",
                "name": "_rawTraits"
            },
            {
                "type": "bytes32[][]",
                "name": "_proofs"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "mintUsernameFor",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "_to"
            },
            {
                "type": "string",
                "name": "_username"
            },
            {
                "type": "address",
                "name": "_paymentToken"
            },
            {
                "type": "string[]",
                "name": "_rawTraits"
            },
            {
                "type": "bytes32[][]",
                "name": "_proofs"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "name",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [],
        "outputs": [
            {
                "type": "string",
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
        "name": "ownerOf",
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
                "type": "address",
                "name": ""
            }
        ]
    },
    {
        "type": "function",
        "name": "pushForbiddenChar",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "string",
                "name": "_str"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "removeForbiddenChar",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "string",
                "name": "_str"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "removePaymentToken",
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
        "name": "removeTrait",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "string",
                "name": "_traitName"
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
        "name": "safeTransferFrom",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "from"
            },
            {
                "type": "address",
                "name": "to"
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
        "name": "safeTransferFrom",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "from"
            },
            {
                "type": "address",
                "name": "to"
            },
            {
                "type": "uint256",
                "name": "tokenId"
            },
            {
                "type": "bytes",
                "name": "data"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "setAdmins",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "_admin"
            },
            {
                "type": "bool",
                "name": "_what"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "setApprovalForAll",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "operator"
            },
            {
                "type": "bool",
                "name": "approved"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "setCosts",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "_token"
            },
            {
                "type": "uint256[]",
                "name": "costs"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "setMaxLength",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "uint256",
                "name": "_newMaxLength"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "supportsInterface",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [
            {
                "type": "bytes4",
                "name": "interfaceId"
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
        "name": "symbol",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [],
        "outputs": [
            {
                "type": "string",
                "name": ""
            }
        ]
    },
    {
        "type": "function",
        "name": "toLower",
        "constant": true,
        "stateMutability": "pure",
        "payable": false,
        "inputs": [
            {
                "type": "string",
                "name": "_str"
            }
        ],
        "outputs": [
            {
                "type": "string",
                "name": "loweredString"
            }
        ]
    },
    {
        "type": "function",
        "name": "tokenByIndex",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [
            {
                "type": "uint256",
                "name": "index"
            }
        ],
        "outputs": [
            {
                "type": "uint256",
                "name": ""
            }
        ]
    },
    {
        "type": "function",
        "name": "tokenIdCounter",
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
        "name": "tokenOfOwnerByIndex",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "owner"
            },
            {
                "type": "uint256",
                "name": "index"
            }
        ],
        "outputs": [
            {
                "type": "uint256",
                "name": ""
            }
        ]
    },
    {
        "type": "function",
        "name": "tokenURI",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [
            {
                "type": "uint256",
                "name": "_tokenId"
            }
        ],
        "outputs": [
            {
                "type": "string",
                "name": ""
            }
        ]
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
                "type": "uint256",
                "name": ""
            }
        ]
    },
    {
        "type": "function",
        "name": "traitToTraitChecker",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [
            {
                "type": "string",
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
        "name": "traits",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [
            {
                "type": "uint256",
                "name": ""
            },
            {
                "type": "uint256",
                "name": ""
            }
        ],
        "outputs": [
            {
                "type": "string",
                "name": ""
            }
        ]
    },
    {
        "type": "function",
        "name": "traitsCategories",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [
            {
                "type": "uint256",
                "name": ""
            },
            {
                "type": "uint256",
                "name": ""
            }
        ],
        "outputs": [
            {
                "type": "string",
                "name": ""
            }
        ]
    },
    {
        "type": "function",
        "name": "transferFrom",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "from"
            },
            {
                "type": "address",
                "name": "to"
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
        "name": "updateArtProxy",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "_newArtProxy"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "updateEmojiUtils",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "_newEmojiUtils"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "updateTraits",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "uint256",
                "name": "tokenId"
            },
            {
                "type": "string[]",
                "name": "_rawTraits"
            },
            {
                "type": "bytes32[][]",
                "name": "_proofs"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "usernameToTokenId",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [
            {
                "type": "string",
                "name": ""
            }
        ],
        "outputs": [
            {
                "type": "uint256",
                "name": ""
            }
        ]
    },
    {
        "type": "function",
        "name": "usernames",
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
                "type": "string",
                "name": ""
            }
        ]
    },
    {
        "type": "function",
        "name": "validateUsername",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [
            {
                "type": "string",
                "name": "username"
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
        "name": "withdrawTokens",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "token"
            },
            {
                "type": "uint256",
                "name": "amount"
            }
        ],
        "outputs": []
    }
]
