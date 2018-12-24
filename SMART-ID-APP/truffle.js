module.exports = {
	networks: {
		development: {
			protocol: 'http',
			host: '192.168.0.155',
			port: 8545,
			network_id: '*',
		},
		ropsten: {
			protocol: 'https',
			host: 'ropsten.infura.io/v3',
			key: 'yoru infura api key here',
			port: 8545,
			network_id: 3,
		},
	},
	migrations_directory: './migrations',
};
