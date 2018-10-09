const address = '0x6691c0be762284C4831146b55f929Bd61895eA86';

const ABI = [{
  constant: false, inputs: [{ name: '_inviteCode', type: 'bytes32' }], name: 'bet', outputs: [], payable: true, stateMutability: 'payable', type: 'function',
}, {
  constant: false, inputs: [{ name: '_inviteCode', type: 'bytes32' }], name: 'claimBet', outputs: [], payable: false, stateMutability: 'nonpayable', type: 'function',
}, {
  constant: false, inputs: [{ name: '_inviteCode', type: 'bytes32' }, { name: '_move', type: 'uint256' }], name: 'move', outputs: [], payable: false, stateMutability: 'nonpayable', type: 'function',
}, {
  constant: false, inputs: [], name: 'newGame', outputs: [{ name: '_inviteCode', type: 'bytes32' }], payable: false, stateMutability: 'nonpayable', type: 'function',
}, {
  constant: true, inputs: [{ name: '_inviteCode', type: 'bytes32' }, { name: '_address', type: 'address' }], name: 'winCount', outputs: [{ name: '_winCount', type: 'uint256' }], payable: false, stateMutability: 'view', type: 'function',
}, {
  constant: false, inputs: [{ name: '_inviteCode', type: 'bytes32' }], name: 'joinGame', outputs: [], payable: false, stateMutability: 'nonpayable', type: 'function',
}, {
  constant: true, inputs: [{ name: '', type: 'bytes32' }], name: 'Games', outputs: [{ name: 'Initialized', type: 'bool' }, { name: 'InviteCode', type: 'bytes32' }, { name: 'GameFinished', type: 'bool' }, { name: 'Block', type: 'uint256' }, { name: 'RoundsPlayed', type: 'uint256' }, { name: 'Winner', type: 'address' }], payable: false, stateMutability: 'view', type: 'function',
}, {
  anonymous: false, inputs: [{ indexed: false, name: 'FirstPlayer', type: 'address' }, { indexed: false, name: 'InviteCode', type: 'bytes32' }, { indexed: false, name: 'Block', type: 'uint256' }], name: 'NewGame', type: 'event',
}, {
  anonymous: false, inputs: [{ indexed: false, name: 'Player', type: 'address' }, { indexed: false, name: 'InviteCode', type: 'bytes32' }, { indexed: false, name: 'Block', type: 'uint256' }], name: 'PlayerJoinedGame', type: 'event',
}, {
  anonymous: false, inputs: [{ indexed: false, name: 'Player', type: 'address' }, { indexed: false, name: 'Move', type: 'uint256' }, { indexed: false, name: 'InviteCode', type: 'bytes32' }, { indexed: false, name: 'Block', type: 'uint256' }], name: 'PlayerMadeMove', type: 'event',
}, {
  anonymous: false, inputs: [{ indexed: false, name: 'Player', type: 'address' }, { indexed: false, name: 'Value', type: 'uint256' }, { indexed: false, name: 'InviteCode', type: 'bytes32' }, { indexed: false, name: 'Block', type: 'uint256' }], name: 'PlayerMadeBet', type: 'event',
}, {
  anonymous: false, inputs: [{ indexed: false, name: 'Player', type: 'address' }, { indexed: false, name: 'Value', type: 'uint256' }, { indexed: false, name: 'InviteCode', type: 'bytes32' }, { indexed: false, name: 'Block', type: 'uint256' }], name: 'PlayerClaimedBet', type: 'event',
}, {
  anonymous: false, inputs: [{ indexed: false, name: 'WinningPlayer', type: 'address' }, { indexed: false, name: 'LosingPlayer', type: 'address' }, { indexed: false, name: 'InviteCode', type: 'bytes32' }, { indexed: false, name: 'Block', type: 'uint256' }], name: 'PlayerWonRound', type: 'event',
}, {
  anonymous: false, inputs: [{ indexed: false, name: 'WinningPlayer', type: 'address' }, { indexed: false, name: 'LosingPlayer', type: 'address' }, { indexed: false, name: 'InviteCode', type: 'bytes32' }, { indexed: false, name: 'Block', type: 'uint256' }], name: 'PlayerWon', type: 'event',
}];

export { address, ABI };
