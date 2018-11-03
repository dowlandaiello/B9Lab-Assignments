pragma solidity^0.4.24;

contract PiggyBank {
    address owner;
    uint248 balance;
    bytes32 hashedPassword;

    function piggyBank(bytes32 _hashedPassword) payable public {
        owner = msg.sender;
        balance += uint248(msg.value);
        hashedPassword = _hashedPassword;
    }

    function () payable public {
        if (msg.sender != owner) revert();
        balance += uint248(msg.value);
    }

    function kill(bytes32 password) public {
        if (keccak256(abi.encodePacked(owner, password)) != hashedPassword) revert();
        selfdestruct(owner);
    }
}