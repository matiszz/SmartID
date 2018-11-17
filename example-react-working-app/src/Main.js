/* @flow */

import React, { Component } from 'react';

import { View, StyleSheet, ActivityIndicator } from 'react-native';

import Block from './Block';

import PTRView from 'react-native-pull-to-refresh';

import * as eth from '../Ethereum/Api'


const styles = StyleSheet.create({
	box: { flex: 1 },
	spacer: { flex: 1 },
});

type Props = {
	web3: *,
};
type State = {
	block: ?any,
	isLoading: boolean,
};

export default class Main extends Component<Props, State> {
	
	state = {
		block: null,
		isLoading: true,
	};
	componentDidMount() {
		const { web3 } = this.props;
		let contract2 = new web3.eth.Contract(contract[0], contract[1]);
		/*web3.eth.getBlock('latest', (err, block) => {
			this.setState({
				block,
				isLoading: false,
			});*/
		web3.eth.getBalance('0xDEDEe8d70Ce88d4bA840D844527880C1c28d7A78', (err, block) => {
			this.setState({
				block,
				isLoading: false,
			});	
		});
	}
	reload = (): Promise<*> => {
		return new Promise((resolve: Function) => {
			const { web3 } = this.props;
			web3.eth.getBlock('latest', (err, block) => {
				this.setState({
					block,
					isLoading: false,
				});
				resolve();
			});
		});
	};
	render() {
		return (
			<PTRView onRefresh={this.reload}>
				<View style={styles.box}>
					{this.state.isLoading && (
						<ActivityIndicator size="large" color="#000000" />
					)}
					{!this.state.isLoading && <Block block={this.state.block} />}
					<View style={styles.spacer} />
				</View>
			</PTRView>
		);
	}

}
