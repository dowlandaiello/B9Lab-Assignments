pragma solidity ^0.4.24;

contract Robust0a {
    bool alreadyPaid;

    function give() public {
        require(!alreadyPaid, "already paid");
        alreadyPaid = true;

        require(msg.sender.call.value(address(this).balance / 2)(), "");
    }
}

contract Robust0b {
    bool alreadyPaid;

    function give() public {
        require(!alreadyPaid, "already paid");
        alreadyPaid = true;

        msg.sender.transfer(address(this).balance / 2);
    }
}

contract Robus1a {
    bool alreadyPaid;

    function give() public {
        if (!alreadyPaid) {
            alreadyPaid = true;
            msg.sender.transfer(address(this).balance / 2);
        }
    }
}