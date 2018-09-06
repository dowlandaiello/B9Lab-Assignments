pragma solidity^0.4.23; // Specify compiler version

// Init splitter contract
contract Splitter {
    address[] splitAddresses;

    function split(address[] destinationAddresses) public payable {
        splitAddresses = destinationAddresses;

        sendEth();
    }

    function sendEth() internal {
        splitAddresses[0].transfer(msg.value/2);
        splitAddresses[1].transfer(msg.value/2);
    }
}