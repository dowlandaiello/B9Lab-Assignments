pragma solidity ^0.4.24;

contract Owned {
    address owner;

    function Owned() public {
        owner = msg.sender;
    }
}

contract Purse is Owned {
    function pay(address whom, uint value) public {
        if (msg.sender != owner) revert();
        if (!whom.send(value)) revert();
    }
}