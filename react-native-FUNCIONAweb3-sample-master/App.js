/* @flow */
import React, { PureComponent } from 'react';

import 'babel-preset-react-native-web3/globals';

import Web3 from 'web3';

import Main from './src/Main';
import Container from './src/Container';

import truffleConfig from './truffle';
const network = truffleConfig.networks.ropsten;

// const TESTRPC_ADDRESS = `${network.protocol}://${network.host}:${network.port}`;

const TESTRPC_ADDRESS = `${network.protocol}://${network.host}/${network.key}`;
var crypto = require('crypto')
// var abc = crypto.createHash('sha1').update('abc').digest('hex')
type Props = *;
export default class App extends PureComponent<Props> {
	constructor(props: Props) {
		super(props);
		// Initialize web3 and set the provider to the testRPC.
		// set the provider you want from Web3.providers
		const web3Provider = new Web3.providers.HttpProvider(TESTRPC_ADDRESS);
		this.web3 = new Web3(web3Provider);
	}
	web3: *;
	render() {
		return (
			<Container>
				<Main web3={this.web3} />
			</Container>
		);
	}
}
