import Web3 from 'web3';
import { store } from '../store/';

/* eslint no-param-reassign: 0 */
/* eslint no-unused-vars: 0 */

const pollWeb3 = (state) => {
  const web3js = window.web3;

  const web3 = new Web3(web3js.currentProvider);

  setInterval(() => {
    if (web3 && store.state.web3.web3Instance) {
      if (web3.eth.coinbase !== store.state.web3.coinbase) {
        let newCoinbase = web3.eth.coinbase;
        newCoinbase = web3.eth.getCoinbase().then((coinbase) => {
          newCoinbase = coinbase;
          web3.eth.getBalance(coinbase, (err, newBalance) => {
            if (err) {
              console.log(err);
            } else {
              store.dispatch('pollWeb3', {
                coinbase: newCoinbase,
                balance: parseInt(newBalance, 10),
              });
            }
          });
        });
      } else {
        web3.eth.getBalance(store.state.web3.coinbase, (err, polledBalance) => {
          if (err) {
            console.log(err);
          } else if (parseInt(polledBalance, 10) !== store.state.web3.balance) {
            store.dispatch('pollWeb3', {
              coinbase: store.state.web3.coinbase,
              balance: polledBalance,
            });
          }
        });
      }
    }
  }, 500);
};

export default pollWeb3;
