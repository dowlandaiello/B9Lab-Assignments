pragma solidity^0.4.24; // Specify compiler version

// Init splitter contract
contract Splitter {
    mapping (address => uint256) unspentSplits; // Store pending withdrawals

    function split(address destinationAddresses1, address destinationAddress2) public payable {
        uint256 splitValue = msg.value / 2;

        uint remainder = msg.value - 2 * splitValue;

        if (remainder > 0) {
            unspentSplits[msg.sender] = remainder;
        }

        unspentSplits[destinationAddresses1] = splitValue;
        unspentSplits[destinationAddress2] = splitValue;
    }

    function withdraw() public {
        sendEth(msg.sender); // Send ether
    }

    function sendEth(address destinationAddress) internal {
        unspentSplits[destinationAddress] = 0; // Set address pending split to 0

        destinationAddress.transfer(unspentSplits[destinationAddress]); // Attempt to transfer to specified address
    }
}