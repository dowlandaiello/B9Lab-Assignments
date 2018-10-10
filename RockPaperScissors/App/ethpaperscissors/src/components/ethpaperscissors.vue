<template>
    <div class="paperscissors">
        <metamask/>
        <ul>
            <li v-on:click="newGame">New Game</li>
        </ul>
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
                inviteCode: "",
                pending: false,
                receipt: null
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
                
                this.pending = true; // Set pending game

                console.log(this.$store.state.contractInstance());

                this.$store.state.contractInstance().methods.newGame().send({from: this.$store.state.web3.coinbase}).on('receipt', function(receipt) {
                    this.receipt = receipt;

                    this.inviteCode = receipt.events.NewGame.returnValues.InviteCode;

                    console.log(receipt);
                    console.log(receipt.events.NewGame.returnValues.InviteCode);
                }).on('error', console.error);
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