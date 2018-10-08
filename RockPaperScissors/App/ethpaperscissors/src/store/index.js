import Vue from 'vue';
import Vuex from 'vuex';
import state from './state';
import { getWeb3 } from '../util/getWeb3';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state,
  mutations: {},
  actions: {
    registerWeb3({ commit }) {
      console.log('registerWeb3 Action being executed');
      getWeb3.then((result) => {
        console.log('committing result to registerWeb3Instance mutation');
        commit('registerWeb3Instance', result);
      }).catch((e) => {
        console.log('error in action registerWeb3', e);
      });
    },
  },
});
