pragma solidity ^0.4.24;

contract Owned {
    address owner;

    constructor() public {
        owner = msg.sender;
    }
}

contract Purse is Owned {
    function pay(address whom, uint value) public {
        if (msg.sender != owner) revert("sender is not owner");
        whom.transfer(value);
    }
}