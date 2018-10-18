<template>
    <div class="paperscissors">
        <metamask/>
        <ul>
            <li v-on:click="newGame">New Game</li>
            <li v-on:click="joinGame">Join Game</li>
        </ul>
        <ul v-if="pending || pendingCreateGame">
            <li v-on:click="rock">Rock</li>
            <li v-on:click="paper">Paper</li>
            <li v-on:click="scissors">Scissors</li>
        </ul>
        <p v-if="pendingCreateGame">Created game! Here's your invite code: {{ inviteCode }}</p>

        <p v-if="loading">Transaction {{ txHash }} submitted, waiting for confirmation.</p>

        <p v-if="errored">Error: {{ error }}</p>

        <p v-if="waiting">Waiting for opponent's move...</p>
    </div>
</template>

<script>
    import Metamask from '@/components/metamask';

    const keccak256 = require('keccak');

    const abi = require('ethereumjs-abi');

    export default {
        name: 'ethpaperscissors',
        beforeCreate () {
            console.log('registerWeb3 Action dispatched from ethpaperscissors.vue');
            this.$store.dispatch('registerWeb3');
        },
        components: {
            'metamask': Metamask
        },
        data () {
            return {
                amount: null,
                move: null,
                test: "test",
                inviteCode: "",
                pending: false,
                pendingCreateGame: false,
                pendingJoinGame: false,
                receipt: null,
                loading: false,
                txHash: "",
                errored: false,
                waiting: false,
                won: false,
                error: "",
                privateKey: ""
            }
        },
        mounted () {
            console.log('dispatching getContractInstance');
            this.$store.dispatch('getContractInstance');
        },
        methods: {
            newGame(event) {
                this.errored = false;

                if(this.pendingCreateGame == true || this.pending == true) { // Check no pending games
                    this.errored = true;
                    this.error = new Error('Must finish all pending games');

                    return; // Exit
                }

                console.log('Initialized game'); // Log new game

                this.$store.state.contractInstance().methods.newGame().send({from: this.$store.state.web3.coinbase, gas: 300000}).on('transactionHash', function(transactionHash) {
                    this.loading = true; // Set loading
                    this.txHash = transactionHash; // Get transaction hash
                }.bind(this)).on('receipt', function(receipt) {
                    this.pendingCreateGame = true; // Set pending game

                    this.receipt = receipt; // Set receipt

                    this.inviteCode = receipt.events.NewGame.returnValues.InviteCode;

                    console.log('invite code: ' + this.inviteCode);

                    this.loading = false;

                    return string(this.inviteCode);
                }.bind(this)).on('error', function(error) {
                    this.errored = true;
                    this.error = error;
                    console.error(error);
                });
            },
            joinGame(event) {
                this.errored = false;

                if(this.pendingJoinGame == true || this.pending == true) { // Check no pending games
                    this.errored = true;
                    this.error = new Error('Must finish all pending games');

                    return; // Exit
                }

                var inviteCode = prompt("Please Specify an Invite Code");

                this.inviteCode = inviteCode; // Set invitecode

                this.privateKey = Math.random().toString(36).substring(7); // Set privatekey

                console.log('Joining game'); // Log new game

                this.joinGame = true; // Set pending game

                this.$store.state.contractInstance().methods.joinGame(inviteCode).send({from: this.$store.state.web3.coinbase}).on('transactionHash', function(transactionHash) {
                    this.loading = true; // Set loading
                    this.txHash = transactionHash; // Set txhash
                }.bind(this)).on('receipt', function(receipt) {
                    this.receipt = receipt;

                    this.pending = true;

                    this.loading = false;

                    console.log("Successfully joined game");
                }.bind(this)).on('error', console.error);
            },
            rock(event) {
                this.errored = false; // Set not errored

                if(this.pending != true) { // Check not in a game
                    this.errored = true; // Set errored
                    this.error = new Error('Not currently in a game'); // Set error
                }

                var parameterTypes = ["uint", "bytes32"];
                var parameterValues = [1, this.privateKey];

                this.$store.state.contractInstance().methods.commitMove(this.inviteCode, web3.sha3(abi.rawEncode(parameterTypes, parameterValues))).send({from: this.$store.state.web3.coinbase}).on('transactionHash', function(transactionHash) {
                    this.loading = true; // Set loading
                    this.txHash = transactionHash; // Set txhash
                }.bind(this)).on('receipt', function(receipt) {
                    this.receipt = receipt;

                    this.loading = false; // Set loading

                    this.pending = true; // Set pending
                    this.waiting = true; // Set waiting

                    this.$store.state.contractInstance().methods.getAllPlayersCommitted(this.inviteCode).call({from: this.$store.web3.eth.coinbase}, function(error, result) {
                        console.log(result); // Log result
                    });
                }.bind(this)).on('error', console.error);
            },
            paper(event) {
                this.errored = false; // Set not errored

                if(this.pending != true) { // Check not in a game
                    this.errored = true; // Set errored
                    this.error = new Error('Not currently in a game'); // Set error
                }

                var parameterTypes = ["uint", "bytes32"];
                var parameterValues = [2, this.privateKey];

                this.$store.state.contractInstance().methods.commitMove(this.inviteCode, web3.sha3(abi.rawEncode(parameterTypes, parameterValues))).send({from: this.$store.state.web3.coinbase}).on('transactionHash', function(transactionHash) {
                    this.loading = true; // Set loading
                    this.txHash = transactionHash; // Set txhash
                }.bind(this)).on('receipt', function(receipt) {
                    this.receipt = receipt;

                    this.loading = false; // Set loading

                    this.pending = true; // Set pending
                    this.waiting = true; // Set waiting

                    this.$store.state.contractInstance().methods.getAllPlayersCommitted(this.inviteCode).call({from: this.$store.web3.eth.coinbase}, function(error, result) {
                        console.log(result); // Log result
                    });
                }.bind(this)).on('error', console.error);
            },
            scissors(event) {
                this.errored = false; // Set not errored

                if(this.pending != true || this.pendingCreateGame != true) { // Check not in a game
                    this.errored = true; // Set errored
                    this.error = new Error('Not currently in a game'); // Set error
                }

                var parameterTypes = ["uint", "bytes32"];
                var parameterValues = [3, this.privateKey];

                this.$store.state.contractInstance().methods.commitMove(this.inviteCode, web3.sha3(abi.rawEncode(parameterTypes, parameterValues))).send({from: this.$store.state.web3.coinbase}).on('transactionHash', function(transactionHash) {
                    this.loading = true; // Set loading
                    this.txHash = transactionHash; // Set txhash
                }.bind(this)).on('receipt', function(receipt) {
                    this.receipt = receipt;

                    this.loading = false; // Set loading

                    this.pending = true; // Set pending
                    this.waiting = true; // Set waiting

                    this.$store.state.contractInstance().methods.getAllPlayersCommitted(this.inviteCode).call({from: this.$store.web3.eth.coinbase}, function(error, result) {
                        console.log(result); // Log result
                    });
                }.bind(this)).on('error', console.error);
            }
        }
    }
</script>

<style scoped>
li{
 cursor: pointer;
}
</style>