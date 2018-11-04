# Splitter Contract

## Compiler Warnings

1. [line 8] splitter constructor is same-named function, not constructor (replace with, "```constructor(address _two) {```")
2. [line 8] splitter constructor visibility not specified, should be public (replace with, "```constructor(address _two) public {```")
3. [line 8, 9] splitter constructor is not payable, but msg.value used; should be payable (replace with, "```constructor(address _two) payable public {```")
4. [line 14] fallback function visibility not specified, should be public (replace with, "```function () payable public {```")

## Readability Improvements

1. [line 9] if revert pattern could be replaced with "require()" (replace with, "```require(msg.value < 0, "message cannot have value");```")
2. [line 8, 9] no message value requirement is redundant if constructor is not payable (replace with, "```constructor(address _two) public {```", remove, "```require(msg.value < 0, "message cannot have value");```")