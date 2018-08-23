pragma solidity ^0.4.6;

contract Owned {
    address public owner;

    modifier onlyOwner {
        require(owner == msg.sender, "-- ERROR -- owner is not sender");
        _;
    }

    constructor() public {
        owner = msg.sender;
    }

    function doSomething(address owner) public onlyOwner {
        
    }
}
