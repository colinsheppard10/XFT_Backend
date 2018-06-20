const HDWalletProvider = require('truffle-hdwallet-provider');

module.exports = {
    // See <http://truffleframework.com/docs/advanced/configuration>
    // to customize your Truffle configuration!
    networks: {
        ganache: {
            host: "localhost",
            port: 7545,
            network_id: "*"
        },
        rinkeby: {
            provider: function () {
                return new HDWalletProvider("loyal enrich regular recall peanut reject resist ostrich kiwi village hello caught", "https://rinkeby.infura.io/ECK10Aj0GLMbSjClhpcV");
            },
            network_id: '4',
            gas: 6650617
        },
    },
    solc: {
        optimizer: {
            enabled: true,
            runs: 200
        }
    }
};
