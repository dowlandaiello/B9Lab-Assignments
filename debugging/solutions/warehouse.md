# Warehouse Contract

## Compiler Warnings

1. [line 5] setDeliveryAddress visibility not specified, should be external (replace with, "```function setDeliveryAddress(string where) external;```").
2. [line 6] ship visibility not specified, should be external (replace with, "```function ship(uint id, address customer) external returns (bool handled);```").
3. [line 13] constructor function should be constructor, not function with same name (replace with "```constructor(address _wallet, address _warehouse) {```").
4. [line 13] constructor visibility not specified, should be public (replace with, "```constructor(address _wallet, address _warehouse) public {```").
5. [line 18] purchase visibility not specified, should be public (replace with "```function purchase(uint id) public returns (bool success) {```").
6. [line 19] .transfer preferred (replace with "```wallet.transfer(msg.value);```").
7. [line 19, 18] msg.value used even though method not payable, make payable (replace with "```function purchase(uint id) payable public returns (bool success) {```").

## Readability Improvements

note: the following line numbers are based on assumed changes made in accordance with the previous corrections/sections.

1. [line 1] unnecessary line break (replace with, "```pragma solidity ^0.4.5;```").

## Bugs

note: the following line numbers are based on assumed changes made in accordance with the previous corrections/sections.

1. Warehouse interface given, but no implementation contract found. Implementation contract should be provided for further analysis.
2. [line 19] Assumes warehouse.ship returns true; false should be handled (i.e. return funds, report some kind of error)