const Web3 = require("web3");

var HDWalletProvider = require("truffle-hdwallet-provider");

var mnemonic = "fragile rely lady dance mass square will idle design private glass drop";

module.exports = {
  networks: {
    ropsten: {
      provider: function () {
        return new HDWalletProvider(mnemonic, "https://ropsten.infura.io/v3/0db77166d63046319c02a3b5f9517b99");
      },
      network_id: 3,
      gas: 7000000
    },
    rinkeby: {
      provider: function () {
        return new HDWalletProvider(mnemonic, "https://rinkeby.infura.io/v3/0db77166d63046319c02a3b5f9517b99");
      },
      network_id: 4,
      gas: 7000000
    },
    private: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*"
    }
  }
};