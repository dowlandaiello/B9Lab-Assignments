pragma solidity ^0.4.24;

// Init remittance contract
contract Remittance {
    mapping (address => uint256) balances; // Balance of each address
    mapping (address => uint256) balanceLastUpdated; // Last time balance was updated
    mapping (address => bytes32) publicKeys; // Public key associated with each address
    
    function deposit(string privatekey1, string privatekey2) public payable {
        balances[msg.sender] = msg.value; // Set user balance
        balanceLastUpdated[msg.sender] = block.number; // Set updated time

        publicKeys[msg.sender] = keccak256(abi.encodePacked(privatekey1, privatekey2)); // Generate public key
    }

    function claim(address claimAddress, string privatekey1, string privatekey2) public payable {
        require(keccak256(abi.encodePacked(privatekey1, privatekey2)) == publicKeys[claimAddress], "Invalid private keys."); // Check for matching privatekeys
        require(msg.sender != claimAddress, "Cannot claim own balance (request a withdrawal instead)."); // Check that claimant isn't issuer
    }

    function withdraw() public payable {
        require((block.number - balanceLastUpdated[msg.sender]) > 60, "Balance is not yet eligible for withdrawal."); // Check balance is mature enough for a withdrawal
    }
}