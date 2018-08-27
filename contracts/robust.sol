pragma solidity ^0.4.24;

contract Robust0a {
    bool alreadyPaid;

    function give() public {
        require(!alreadyPaid, "already paid");
        alreadyPaid = true;
    }
}