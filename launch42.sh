#!/bin/bash

# Run this once, but it does not hurt to run it every time
geth --datadir /r/B9Lab-Assignments/net42 init /r/B9Lab-Assignments/genesis42.json
# Run this every time you start your Geth "42", and add flags here as you need
geth --datadir /r/B9Lab-Assignments/net42 --networkid 42 console