import Web3 from 'web3';

import 'babel-preset-react-native-web3/globals';


import truffleConfig from '../truffle';

const network = truffleConfig.networks.ropsten;

// const TESTRPC_ADDRESS = `${network.protocol}://${network.host}:${network.port}`;

const TESTRPC_ADDRESS = `${network.protocol}://${network.host}/${network.key}`;
var crypto = require('crypto')
// var abc = crypto.createHash('sha1').update('abc').digest('hex')
type Props = *;

const web3Provider = new Web3.providers.HttpProvider(TESTRPC_ADDRESS);
export const web3 = new Web3(web3Provider);



//import IPFS from 'ipfs-api';

/**
 * In this file we export all the configuration needed by the API file. Concretely:
 * @return web3 → Class to communicate with MetaMask.
 * @return ipfs → Class to communicate with IPFS.
 * @return contract → Class to communicate with the Smart Contract.
**/
//export const web3 = new Web3(window.web3.currentProvider);
//export const ipfs = new IPFS({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });


//export const address = '0x4c26222547d46f6310309340abf2acb94fe87209';
//export const address = '0xfbdc4a89ac808efb20565a862de720dc51d1d5a4'; // contrato matias 
export const address = '0x374b8ce4ac89110ee2e3bcc3d76eeff8d7f38234';
export const abi = [
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


// creation of contract object
var MyContract = web3.eth.contract(abi);
// initiate contract for an address
var contract = MyContract.at(address);
export default contract;

/*
// send a transaction to a function
myContractInstance.myStateChangingMethod('someParam1', 23, {value: 200, gas: 2000});
// short hand style
web3.eth.contract(abi).at(address).myAwesomeMethod(...);
// create filter
var filter = myContractInstance.myEvent({a: 5}, function (error, result) {
 if (!error)
   console.log(result);
   /*
   {
       address: '0x8718986382264244252fc4abd0339eb8d5708727',
       topics: "0x12345678901234567890123456789012", "0x0000000000000000000000000000000000000000000000000000000000000005",
       data: "0x0000000000000000000000000000000000000000000000000000000000000001",
       ...
   }
   
});

let contract = new web3.eth.contract(abi, address);
*/