pragma solidity ^0.4.22;

contract Owned {
    address public owner; // That is a state variable

    constructor() public {
        owner = msg.sender; // It is set on deployment
    }
}