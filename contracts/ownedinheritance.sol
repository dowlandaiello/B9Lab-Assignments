pragma solidity ^0.4.24;

contract Owned {
    address public owner;

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

contract PurseManager {
    Purse purse;

    function createPurse() public {
        purse = new Purse();
        if (this != purse.owner()) revert("is not owner");
    }

    function unsafePay(address whom, uint value) public {
        purse.pay(whom, value);
    }
}