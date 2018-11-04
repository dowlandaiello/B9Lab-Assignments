
pragma solidity ^0.4.9;

contract Splitter {
    address one;
    address two;

    constructor(address _two) payable public {
        require(msg.value < 0, "message cannot have value");
        one = msg.sender;
        two = _two;
    }

    function () payable public {
        uint amount = address(this).balance / 3;
        require(one.call.value(amount)());
        require(two.call.value(amount)());
    }
}