pragma solidity 0.4.24;

contract NostradamusReveal2 {
    mapping (address => bool) public prophets;

    event LogProphecised(bytes32 indexed exact);

    constructor() public {
    }

    function prophecise(bytes32 exact) public {
        uint blockNumber = block.number;
        bytes32 blockHash = blockhash(blockNumber);
        require(keccak256(abi.encodePacked(msg.sender, blockNumber, blockHash, block.timestamp, this)) == exact);
        prophets[msg.sender] = true;
        emit LogProphecised(exact);
    }

    function theWord() public view returns([]bytes32 exact) {
        uint blockNumber = block.number; // Fetch current block number
        bytes32 blockHash = blockhash(block.number); // Fetch hash of current block
        return keccak256(abi.encodePacked(msg.sender, blockHash, blockNumber, block.timestamp, this)), keccak256(abi.encodePacked(msg.sender, blockNumber, blockHash, block.timestamp, this)); // Hash byte value of address+latest block hash+latest block number+latest block timestamp
    }
}