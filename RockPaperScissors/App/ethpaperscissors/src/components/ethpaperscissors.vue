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
                inviteCode: null,
                pending: false
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

                this.$store.state.contractInstance().newGame()
            }
        }
    }
</script>

<style scoped>
li{
 cursor: pointer;
}
</style>