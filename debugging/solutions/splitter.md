# Splitter Contract

## Compiler Warnings

1. [line 8] splitter constructor is same-named function, not constructor (replace with, "```constructor(address _two) {```")
2. [line 8] splitter constructor visibility not specified, should be public (replace with, "```constructor(address _two) public {```")
3. [line 8, 9] splitter constructor is not payable, but msg.value used; should be payable (replace with, "```constructor(address _two) payable public {```")
4. [line 14] fallback function visibility not specified, should be public (replace with, "```function () payable public {```")

## Readability Improvements

note: the following line numbers are based on assumed changes made in accordance with the previous section

1. [line 9] if revert pattern could be replaced with "require()" (replace with, "```require(msg.value < 0, "message cannot have value");```")
2. [line 8, 9] no message value requirement is redundant if constructor is not payable (replace with, "```constructor(address _two) public {```", remove, "```require(msg.value < 0, "message cannot have value");```")
3. [line 5, 6 after previous correction] could be replaced with address array of fixed size (2) instead of individual address variables (replace with, "```address[2] recipients;```")
4. [line 8, 9, 14, 15 in accordance with previous correction] replace references to individual addresses (one, two) with array reference (replace with, "```recipients[0 or 1]```")
5. [line 1] Unnecessary line break (replace with, "```pragma solidity ^0.4.9;```")

## Bugs

note: the following line numbers are based on assumed changes made in accordance with the previous section

1. [line 12] contract balance divided by 3 despite the fact that the result is split between two addresses (replace with, "```uint amount = address(this).balance / 2;```")
2. [line 13, 14] unsafe send, should be recipients[0 or 1].transfer(amount);
3. [line 13, 14] assumes recipient isn't contract, and won't reject payment; should the first recipient reject a payment, the contract would stop execution and the second recipient wouldn't be paid. Instead of sending coins to both recipients at once, store each recipient's balance and allow the recipient to claim their balance manually.
4. [line 12] unsafe division, should handle remainder (i.e. refund splitter, store remainder in contract, etc...)