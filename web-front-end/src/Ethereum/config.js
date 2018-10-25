import Web3 from 'web3';
import IPFS from 'ipfs-api';
// const IPFS = require('ipfs-api'); TCGW

export const web3 = new Web3(window.web3.currentProvider);
export const ipfs = new IPFS({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });

const address = '0x199dcc6060469884a63e18236eb457c02c0aacf6';
const abi = [
    {
        "constant": false,
        "inputs": [
            {
                "name": "_name",
                "type": "string"
            },
            {
                "name": "_lastName",
                "type": "string"
            },
            {
                "name": "_birthDate",
                "type": "string"
            },
            {
                "name": "_gender",
                "type": "string"
            },
            {
                "name": "_nacionality",
                "type": "string"
            },
            {
                "name": "_residence",
                "type": "string"
            },
            {
                "name": "_city",
                "type": "string"
            },
            {
                "name": "_ID",
                "type": "uint32"
            }
        ],
        "name": "register_citizen",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "_ID",
                "type": "uint32"
            }
        ],
        "name": "get_basic_info",
        "outputs": [
            {
                "name": "",
                "type": "uint32"
            },
            {
                "name": "",
                "type": "string"
            },
            {
                "name": "",
                "type": "string"
            },
            {
                "name": "",
                "type": "string"
            },
            {
                "name": "",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "_ID",
                "type": "uint32"
            }
        ],
        "name": "get_name",
        "outputs": [
            {
                "name": "",
                "type": "uint32"
            },
            {
                "name": "",
                "type": "string"
            },
            {
                "name": "",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "_ID",
                "type": "uint32"
            }
        ],
        "name": "get_residency",
        "outputs": [
            {
                "name": "",
                "type": "uint32"
            },
            {
                "name": "",
                "type": "string"
            },
            {
                "name": "",
                "type": "string"
            },
            {
                "name": "",
                "type": "string"
            },
            {
                "name": "",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "view_president_address",
        "outputs": [
            {
                "name": "",
                "type": "address"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }
];
let contract = new web3.eth.Contract(abi, address);
export default contract;