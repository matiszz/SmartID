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
			key: '184e9af6d5404f759598674dc70f3c11',
			port: 8545,
			network_id: 3,
		},
	},
	migrations_directory: './migrations',
};
