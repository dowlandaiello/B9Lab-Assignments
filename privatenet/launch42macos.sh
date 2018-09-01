#!/bin/bash

# Run this once, but it does not hurt to run it every time
geth --datadir ~/desktop/B9Lab-Assignments/privatenet/net42 init ~/desktop/B9Lab-Assignments/privatenet/genesis42.json --rpc
# Run this every time you start your Geth "42", and add flags here as you need
geth --datadir ~/desktop/B9Lab-Assignments/privatenet/net42 --networkid 42 console --rpc