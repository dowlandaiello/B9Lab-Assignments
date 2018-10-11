<template>
    <div class="paperscissors">
        <metamask/>
        <ul>
            <li v-on:click="newGame">New Game</li>
        </ul>
        <p v-if="pending">Created game! Here's your invite code: {{ inviteCode }}</p>

        <p v-if="loading">Transaction {{ txHash }} submitted, waiting for confirmation.</p>
    </div>
</template>

<script>
    import Metamask from '@/components/metamask';

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
                receipt: null,
                loading: false,
                txHash: ""
            }
        },
        mounted () {
            console.log('dispatching getContractInstance');
            this.$store.dispatch('getContractInstance');
        },
        methods: {
            newGame(event) {
                if(this.pending == true) { // Check no pending games
                    return; // Exit
                }

                console.log('Initialized game'); // Log new game

                console.log(this.$store.state.contractInstance());

                this.$store.state.contractInstance().methods.newGame().send({from: this.$store.state.web3.coinbase, gas: 300000}).on('transactionHash', function(transactionHash) {
                    this.loading = true; // Set loading
                    this.txHash = transactionHash; // Get transaction hash
                }.bind(this)).on('receipt', function(receipt) {
                    this.pending = true; // Set pending game

                    this.receipt = receipt; // Set receipt

                    this.inviteCode = receipt.events.NewGame.returnValues.InviteCode;

                    console.log(receipt);
                    console.log(this.inviteCode);

                    this.loading = false;

                    return string(this.inviteCode);
                }.bind(this)).on('error', console.error);
            },
            joinGame(event) {
                if(this.pending == true) { // Check no pending games
                    return; // Exit
                }

                console.log('Joining game'); // Log new game

                this.pending = true; // Set pending game

                console.log(this.$store.state.contractInstance());

                this.$store.state.contractInstance().methods.joinGame.send({from: this.$store.state.web3.coinbase}).on('receipt', function(receipt) {
                    this.receipt = receipt;

                    console.log(receipt);
                    console.log(receipt.events.PlayerJoinedGame.returnValues.Player);
                }).on('error', console.error);
            }
        }
    }
</script>

<style scoped>
li{
 cursor: pointer;
}
</style>