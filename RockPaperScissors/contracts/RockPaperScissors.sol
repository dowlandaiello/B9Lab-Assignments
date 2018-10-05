pragma solidity ^0.4.24; // Specify compiler version

contract RockPaperScissors {
    struct Game {
        address[] Players; // Players in game
        bytes32 InviteCode; // Game invitecode
        bool GameFinished; // Game finished
        uint Block; // Origin block
        uint RoundsPlayed; // Rounds played
        mapping(address => uint) Bet; // Bets
    }

    event NewGame (
        address FirstPlayer, // Player initializing game
        bytes32 InviteCode, // Game invite code
        uint Block // Origin block
    );

    mapping(bytes32 => Game) Games;

    function newGame() public returns (bytes32 _inviteCode) {
        address[] memory players = new address[](2); // Initialize array

        players[0] = msg.sender; // Append sender to players

        Game memory game = Game(players, keccak256(abi.encodePacked(players, block.number)), false, block.number, 0); // Initialize game

        Games[game.InviteCode] = game; // Append game to games list

        emit NewGame(msg.sender, game.InviteCode, block.number); // Emit initialized game

        return game.InviteCode; // Return invite code
    }

    function bet(bytes32 _inviteCode) public {
        require(Games[_inviteCode].RoundsPlayed == 0, "Game already started."); // Check game hasn't already started
        require(isIn(msg.sender, Games[_inviteCode].Players), "Player not in game."); // Check player is in game
    }

    function isIn(address value, address[] _array) pure internal returns (bool _isIn) {
        for (uint x = 0; x != _array.length; x++) {
            if (_array[x] == value) {
                return true; // Found value
            }
        }

        return false; // Reached end of array
    }
}