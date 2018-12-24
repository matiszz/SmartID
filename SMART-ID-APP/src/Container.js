/* @flow */

import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';

import { MaterialIcons } from '@expo/vector-icons';

export default class Container extends Component<{
	children?: any,
}> {
	render() {
		return (
			<View style={styles.Container}>
				<View style={styles.Header}>
					<MaterialIcons name="cast-connected" size={64} color={'#80CBC4'} />
				</View>
				<View style={styles.titleContainer}>
					<Text style={[styles.title]}>
						Block Status of Ropsten Ethereum network
					</Text>
				</View>
				{this.props.children}
				<View style={styles.footerContainer}>
					<Text style={[styles.title]}>MIT License @ zetta</Text>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	Container: {
		flex: 1,
	},
	Header: {
		paddingTop: 40,
		paddingBottom: 20,
		paddingHorizontal: 12,
		backgroundColor: '#37474f',
		alignItems: 'center',
	},
	titleContainer: {
		paddingHorizontal: 12,
		paddingVertical: 10,
		backgroundColor: '#62727b',
	},
	footerContainer: {
		paddingHorizontal: 12,
		paddingVertical: 10,
		backgroundColor: '#616161',
	},
	title: {
		alignItems: 'center',
		color: 'white',
	},
});
