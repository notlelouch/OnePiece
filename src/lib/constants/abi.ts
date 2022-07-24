const abi = {
	erc20: [
		'function approve(address, uint)',
		'function allowance(address owner, address spender) view returns (uint)',
		'function balanceOf(address) view returns (uint)'
	],
	erc721: [
		'function ownerOf(uint256) view returns (address)',
		'function balanceOf(address )  view returns (uint256 )',
		'function totalSupply() external view returns (uint256)',
		'function approve(address, uint256) external'
	],
	nftSwap: [
		{
		  "inputs": [
			{
			  "internalType": "address",
			  "name": "_collectionAddress",
			  "type": "address"
			}
		  ],
		  "stateMutability": "nonpayable",
		  "type": "constructor"
		},
		{
		  "inputs": [
			{
			  "internalType": "bytes32",
			  "name": "hash",
			  "type": "bytes32"
			}
		  ],
		  "name": "askLength",
		  "outputs": [
			{
			  "internalType": "uint256",
			  "name": "",
			  "type": "uint256"
			}
		  ],
		  "stateMutability": "view",
		  "type": "function"
		},
		{
		  "inputs": [
			{
			  "internalType": "bytes32",
			  "name": "",
			  "type": "bytes32"
			},
			{
			  "internalType": "uint256",
			  "name": "",
			  "type": "uint256"
			}
		  ],
		  "name": "asks",
		  "outputs": [
			{
			  "internalType": "address",
			  "name": "",
			  "type": "address"
			}
		  ],
		  "stateMutability": "view",
		  "type": "function"
		},
		{
		  "inputs": [],
		  "name": "collectionAddress",
		  "outputs": [
			{
			  "internalType": "address",
			  "name": "",
			  "type": "address"
			}
		  ],
		  "stateMutability": "view",
		  "type": "function"
		},
		{
		  "inputs": [
			{
			  "internalType": "uint256",
			  "name": "tokenA",
			  "type": "uint256"
			},
			{
			  "internalType": "uint256[]",
			  "name": "asksArray",
			  "type": "uint256[]"
			}
		  ],
		  "name": "depositRequestForExchange",
		  "outputs": [],
		  "stateMutability": "nonpayable",
		  "type": "function"
		},
		{
		  "inputs": [
			{
			  "internalType": "uint256",
			  "name": "",
			  "type": "uint256"
			}
		  ],
		  "name": "isAvailable",
		  "outputs": [
			{
			  "internalType": "bool",
			  "name": "",
			  "type": "bool"
			}
		  ],
		  "stateMutability": "view",
		  "type": "function"
		}
	  ],
}

export default abi;