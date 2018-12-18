import Web3 from 'web3';

import 'babel-preset-react-native-web3/globals';


import truffleConfig from '../truffle';

const network = truffleConfig.networks.ropsten;

const TESTRPC_ADDRESS = `${network.protocol}://${network.host}/${network.key}`;
var crypto = require('crypto')
type Props = *;

const web3Provider = new Web3.providers.HttpProvider(TESTRPC_ADDRESS);
export const web3 = new Web3(web3Provider);

export const address = '0x7be08bd23229dae7b36142c67c4b16f360f8e3b6';
const abi = [
    {
        "constant": false,
        "inputs": [
            {
                "name": "addr",
                "type": "address"
            },
            {
                "name": "roleNumber",
                "type": "uint8"
            }
        ],
        "name": "addRole",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "st",
                "type": "bool"
            }
        ],
        "name": "changeStatus",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "ID",
                "type": "uint32"
            },
            {
                "name": "recordPosition",
                "type": "uint32"
            }
        ],
        "name": "deleteClinicRecord",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "ID",
                "type": "uint32"
            },
            {
                "name": "recordPosition",
                "type": "uint32"
            }
        ],
        "name": "deleteLegalRecord",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "ID",
                "type": "uint32"
            },
            {
                "name": "position",
                "type": "uint32"
            }
        ],
        "name": "getClinicRecords",
        "outputs": [
            {
                "name": "",
                "type": "bytes32"
            },
            {
                "name": "",
                "type": "bytes32"
            },
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "ID",
                "type": "uint32"
            },
            {
                "name": "position",
                "type": "uint32"
            }
        ],
        "name": "getLegalRecords",
        "outputs": [
            {
                "name": "",
                "type": "bytes32"
            },
            {
                "name": "",
                "type": "bytes32"
            },
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
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
            },
            {
                "name": "_image",
                "type": "string"
            }
        ],
        "name": "modify_citizen",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
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
            },
            {
                "name": "_image",
                "type": "string"
            }
        ],
        "name": "register_citizen",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "ID",
                "type": "uint32"
            },
            {
                "name": "record",
                "type": "bytes32"
            },
            {
                "name": "date",
                "type": "bytes32"
            }
        ],
        "name": "registerClinicRecord",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "ID",
                "type": "uint32"
            },
            {
                "name": "record",
                "type": "bytes32"
            },
            {
                "name": "date",
                "type": "bytes32"
            }
        ],
        "name": "registerLegalRecord",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "addr",
                "type": "address"
            },
            {
                "name": "roleNumber",
                "type": "uint8"
            }
        ],
        "name": "removeRole",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "ID",
                "type": "uint32"
            }
        ],
        "name": "removeUser",
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
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "name": "ID",
                "type": "uint32"
            }
        ],
        "name": "UserAdded",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "name": "ID",
                "type": "uint32"
            }
        ],
        "name": "UserRemoved",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "name": "Status",
                "type": "bool"
            }
        ],
        "name": "StatusChanged",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "name": "record",
                "type": "bytes32"
            },
            {
                "indexed": false,
                "name": "date",
                "type": "bytes32"
            },
            {
                "indexed": false,
                "name": "valid",
                "type": "bool"
            }
        ],
        "name": "SendRegister",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "name": "addr",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "roleName",
                "type": "uint8"
            }
        ],
        "name": "RoleAdded",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "name": "addr",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "roleName",
                "type": "uint8"
            }
        ],
        "name": "RoleRemoved",
        "type": "event"
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
            },
            {
                "name": "",
                "type": "string"
            },
            {
                "name": "",
                "type": "bool"
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
        "inputs": [
            {
                "name": "ID",
                "type": "uint32"
            }
        ],
        "name": "getNumberClinicRecords",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
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
                "name": "ID",
                "type": "uint32"
            }
        ],
        "name": "getNumberLegalRecords",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
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
                "name": "addr",
                "type": "address"
            },
            {
                "name": "roleName",
                "type": "uint8"
            }
        ],
        "name": "hasSpecificRole",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "numberOfActiveUsers",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "status",
        "outputs": [
            {
                "name": "",
                "type": "bool"
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

// creation of contract object
var MyContract = web3.eth.contract(abi);
// initiate contract for an address
var contract = MyContract.at(address);
export default contract;
