#!/bin/bash

# Run this once, but it does not hurt to run it every time
geth --datadir ~/desktop/B9Lab-Assignments/privatenet/net42 init ~/desktop/B9Lab-Assignments/privatenet/genesis42.json --rpc --rpcport 8545 --rpcaddr 0.0.0.0 --rpccorsdomain "*" --rpcapi "eth,net,web3" --gcmode archive console
# Run this every time you start your Geth "42", and add flags here as you need
geth --datadir ~/desktop/B9Lab-Assignments/privatenet/net42 --networkid 42 console --rpc --rpcport 8545 --rpcaddr 0.0.0.0 --rpccorsdomain "*" --rpcapi "eth,net,web3" --gcmode archive console