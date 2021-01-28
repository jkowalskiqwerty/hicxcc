import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tableDrawerOpened: false
  },
  mutations: {
    openTableDrawerMutation(state) {
      console.log('openTableDrawer mutation fired');

      state.tableDrawerOpened=true;
    },
    closeTableDrawerMutation(state) {
      state.tableDrawerOpened=false;
    },
  },
  actions: {
    openTableDrawerAction({ commit }) {
      commit("openTableDrawerMutation");
    },
    closeTableDrawerAction({ commit }) {
      commit("closeTableDrawerMutation");
    },
  },
  modules: {
  }
})
