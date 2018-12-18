# react-native-app

You can try it with expo at

https://expo.io/@sergio8215/smart-id



[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://gitlab.com/dapps/react-native-web3-sample)

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

## Overview

* It's basically a mobile dapp for iOS and android done using `react-native` and `web3`.

## Getting started in localhost

JSON-RPC node can be running and configured in `truffle.js` with your local network IP ( replace `127.0.0.1` ) or as it is by **default** on [Testnet Ropsten](https://ropsten.etherscan.io/) ( API-Key Token is needed ).

For more information about truffle see [ganache-cli](https://github.com/trufflesuite/ganache-cli)

## Run the web server

* Node 8 LTS
* You can use yarn or npm

```bash
# Install dependencies
yarn

# and from a separate shell Run the mobile app
exp start
```

## Main Dependencies

* [React Native](https://facebook.github.io/react-native/) for building the user interface
* [expo](https://expo.io) for building a the cross platform native app
* [web3](https://github.com/ethereum/web3.js) as the Etherum Javascript API
* [Flow](https://flow.org/) as a javascript typechecker
* [babel-preset-react-native-web3](https://github.com/agrcrobles/babel-preset-react-native-web3)

## Expo

![demo-example](https://gitlab.com/dapps/react-native-web3-sample/raw/master/assets/demo.png)

## License

MIT @ zetta
