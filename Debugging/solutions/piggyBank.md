# PiggyBank Contract

## Found Bugs

1. [line 1] Compiler version not specified (should be, "```pragma solidity ^0.4.24;```")

2. [line 6] piggyBank function visibility not specified (should be, "```function piggyBank(bytes32 _hashedPassword) public {```")

3. [line 8] piggyBank function not payable, but msg.value used (line 6 should be, "```function piggyBank(bytes32 _hashedPassword) payable public {```")

4. [line 12] fallback function visibility not specified (should be, "```function () payable public {```")

5. [line 17] kill function visibility not specified (should be, "```function kill(bytes32 password) public {```")

6. [line 18] keccak256() accepts only one argument; wrap arguments in abi.encodePacked() (should be, "```if (keccak256(abi.encodePacked(owner, password)) != hashedPassword) revert();```")