# PiggyBank Contract

## Compiler Warnings

1. [line 1] Compiler version not specified (should be, "```pragma solidity ^0.4.24;```")

2. [line 6] piggyBank function visibility not specified (should be, "```function piggyBank(bytes32 _hashedPassword) public {```")

3. [line 8] piggyBank function not payable, but msg.value used (line 6 should be, "```function piggyBank(bytes32 _hashedPassword) payable public {```")

4. [line 12] fallback function visibility not specified (should be, "```function () payable public {```")

5. [line 17] kill function visibility not specified (should be, "```function kill(bytes32 password) public {```")

6. [line 18] keccak256() accepts only one argument; wrap arguments in abi.encodePacked() (should be, "```if (keccak256(abi.encodePacked(owner, password)) != hashedPassword) revert();```")

## Readability Improvements

note: the following line numbers are based on assumed changes made in accordance with the previous section

1. [line 15] consider swapping out, "if (msg.sender != owner) revert();," for, "require(msg.sender == owner);," (should be, "```require(msg.sender == owner);```")
2. [line 20] consider swapping out, "if (keccak256(abi.encodePacked(owner, password)) != hashedPassword) revert();," for, "```require(keccak256(abi.encodePacked(owner, password)) == hashedPassword);```")
3. [line 14] consider delegating revert fallback, and renaming existing fallback to deposit() (rename existing fallback to deposit(), add new fallback that reverts)

## Bugs

note: the following line numbers are based on assumed changes made in accordance with the previous section

1. [line 8] constructor method is callable by any user; make constructor instead of function (should be, "```constructor(bytes32 _hashedPassword) payable public {```")
2. [line 8, line 14, line 18] password is redundant if fallback function and kill() made isOwner (add isOwner modifier that requires msg.sender == owner, add ```"isOwner"``` after "```functionName (...)```" on lines 14, 18 (lines 20 and 25 after adding isOwner modifier), remove password argument from constructor and kill(), remove hashedPassword field, remove hashedPassword setter in constructor)