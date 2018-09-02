var HDWalletProvider = require("truffle-hdwallet-provider");

var mnemonic = "fragile rely lady dance mass square will idle design private glass drop";

module.exports = {
    networks: {
        ropsten: {
            provider: function() {
                return new HDWalletProvider(mnemonic, "https://ropsten.infura.io/v3/0db77166d63046319c02a3b5f9517b99");
            },
            network_id: 3,
            gas: 2900000
        },
        net42: {
            host: "localhost",
            port: 8545,
            network_id: 42,
            gas: 2900000
        }   
    }
};