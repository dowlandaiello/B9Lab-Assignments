pragma solidity ^0.4.9;

contract Splitter {
    address[2] recipients;

    constructor(address _two) payable public {
        recipients[0] = msg.sender;
        recipients[1] = _two;
    }

    function () payable public {
        uint amount = address(this).balance / 2;
        require(recipients[0].call.value(amount)());
        require(recipients[1].call.value(amount)());
    }
}