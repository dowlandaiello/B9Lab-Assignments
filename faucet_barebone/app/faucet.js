// ~/DAPPS/faucet_barebone/app/faucet.js
if (typeof web3 !== "undefined") {
  // Don't lose an existing provider, like Mist or Metamask
  web3 = new Web3(web3.currentProvider);
} else {
  // set the provider you want from Web3.providers
  web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}

web3.eth.getCoinbase(function(err, coinbase) {
  if (err) {
    console.error(err);
  } else {
    console.log("Coinbase: " + coinbase);
  }
});

// Your deployed address changes every time you deploy.
const faucetCompiled = {
  contracts: {
    "./faucet.sol:Faucet": {
      abi:
        '[{"constant":true,"inputs":[],"name":"getBalance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"toWhom","type":"address"}],"name":"sendWei","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"getWei","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getSendAmount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"killMe","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":true,"stateMutability":"payable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"}]',
      bin:
        "6080604052336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550670de0b6b3a7640000600181905550610358806100626000396000f300608060405260043610610078576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806312065fe01461007a578063148f2e5e146100a55780633ba15036146100e85780638da5cb5b146100ff57806390b08a5214610156578063b603cd8014610181575b005b34801561008657600080fd5b5061008f6101b0565b6040518082815260200191505060405180910390f35b3480156100b157600080fd5b506100e6600480360381019080803573ffffffffffffffffffffffffffffffffffffffff1690602001909291905050506101cf565b005b3480156100f457600080fd5b506100fd61021b565b005b34801561010b57600080fd5b50610114610266565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34801561016257600080fd5b5061016b61028b565b6040518082815260200191505060405180910390f35b34801561018d57600080fd5b50610196610295565b604051808215151515815260200191505060405180910390f35b60003073ffffffffffffffffffffffffffffffffffffffff1631905090565b8073ffffffffffffffffffffffffffffffffffffffff166108fc6001549081150290604051600060405180830381858888f19350505050158015610217573d6000803e3d6000fd5b5050565b3373ffffffffffffffffffffffffffffffffffffffff166108fc6001549081150290604051600060405180830381858888f19350505050158015610263573d6000803e3d6000fd5b50565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000600154905090565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415156102f257600080fd5b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16ff00a165627a7a72305820b93a7f20b989ac30e7d0d9c95ec262c634c72ebef3e6758ce40c68545f5dc28d0029"
    }
  },
  version: "0.4.24+commit.e67f0147.Darwin.appleclang"
};
const faucetAddress = "0xd2cc566c94fc4722026a93ec4688f4804243e706"; // <-- Put your own
const faucetContractFactory = web3.eth.contract(
  JSON.parse(faucetCompiled.contracts["Faucet.sol:Faucet"].abi)
);
const faucetInstance = faucetContractFactory.at(faucetAddress);

// Query eth for balance
web3.eth.getBalance(faucetAddress, function(err, balance) {
  if (err) {
    console.error(err);
  } else {
    console.log("Contract balance: " + balance);
  }
});

// Query the contract directly
faucetInstance.getBalance.call(function(err, balance) {
  if (err) {
    console.error(err);
  } else {
    console.log("Faucet balance: " + balance);
  }
});

function topUp() {
  web3.eth.getCoinbase(function(err, coinbase) {
    if (err) {
      console.error(err);
    } else {
      web3.eth.sendTransaction(
        {
          from: coinbase,
          to: faucetAddress,
          value: web3.toWei(1, "ether")
        },
        function(err, txn) {
          if (err) {
            console.error(err);
          } else {
            console.log("topUp txn: " + txn);
          }
        }
      );
    }
  });
}

function sendWei() {
  web3.eth.getCoinbase(function(err, coinbase) {
    if (err) {
      console.error(err);
    } else {
      web3.eth.getAccounts(function(err, accounts) {
        if (err) {
          console.error(err);
        } else {
          const targetAccount = accounts[1];
          faucetInstance.sendWei(targetAccount, { from: coinbase }, function(
            err,
            txn
          ) {
            if (err) {
              console.error(err);
            } else {
              console.log("sendWei txn: " + txn);
            }
          });
        }
      });
    }
  });
}
