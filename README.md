# Smart ID
###### A blockchain based prototype of the ID of the future
![SMART ID](https://github.com/sergio8215/FIB-PTI-ID-of-the-future-using-blockchain/blob/master/logos/logo-blue-no-back.png?raw=true)
## What is SmartID?
SmartID is a prototype of the ID of the future. It does not make sense to be in full 2019 and have to queue at the police station to ask for the municipal registration papers, then another queue at the town hall to ask for a change of address, and another to renew your passport. SmartID wants to put an end to bureaucracy and wasting time waiting for documents. We want to democratize the citizens' data, because they are ours. We want to build a decentralized system, safe, but above all accessible. Why is it that if one day you decide to change your medical centre, they don't have any of your data? SmartID provides you with all your data in a single interface. However, your data will not be owned by a single institution, but will be distributed in the Ethereum network.

SmartID is a project for FIB - UPC developed by @matiszz, @sergio8215, @kolle, Mario and Dani.

## Try it yourself
First of all, clone this repository in a folder.
### 1 - Install MetaMask
Please download and install [MetaMask](https://metamask.io/) in your Chrome, Firefox or Opera browser. Create an account.

### 2 - Deploy de contract

 1. Go to [Remix](https://remix.ethereum.org/#optimize=false&version=soljson-v0.4.22+commit.4cb486ee.js) and upload the four `.sol` files in the **smart-contract** folder.
 2. Select the compiler version: `0.4.22+commit.4cb486ee` and click **Start to compile**
 3. Navigate to the **Run** tab, and make sure you have the following configuration:
 **Environment:** Injected Web3 (Ropsten)
 **Account:** Select your account address
 **Gas limit:** 3000000
 **Value:** 0
 4. In the dropdown, make sure that the **CitizensRecord** is selected, and click deploy. 
 5. Click in the address of the new contract to copy it in the clipboard.
 
### 3 - Set the web app
 1. Navigate to the `FIB-PTI-Smart-ID` folder you just cloned in your PC.
 2. `$ cd web-front-end`
 3. `$ npm install`
 4. `$ npm start`
 5. Navigate to [localhost:3000](http://localhost:3000/)