import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tableDrawerOpened: false,
    items: [],
    editingrecord: {},
  },
  mutations: {
    openTableDrawerMutation(state) {
      state.tableDrawerOpened = true;
    },
    closeTableDrawerMutation(state) {
      state.tableDrawerOpened = false;
    },
    deleteRecordMutation(state) {
      //searching for an index by id to delete then removing from array
      const indx = state.items.findIndex(v => v.id == state.editingrecord.id);
      state.items.splice(indx, indx >= 0 ? 1 : 0);
    },
    insertOrUpdateTableDataItemMutation(state, item) {
      //id=0 means insert otherwise delete
      if(item.id==0)
      {
        var id=1;
        if(state.items.length>0) id=Math.max.apply(Math, state.items.map(function(o) { return o.id; }))+1;
        var itemtosave = { id: id, title: item.title, status: item.status };
        state.items.push(itemtosave);
      }
      else
      {
        const indx = state.items.findIndex(v => v.id == item.id);
        state.items[indx]=item;
      }


    },
  },
  actions: {
    openTableDrawerAction({ commit }) {
      commit("openTableDrawerMutation");
    },
    closeTableDrawerAction({ commit }) {
      commit("closeTableDrawerMutation");
    },
    deleteRecordAction({ commit }) {
      commit("deleteRecordMutation");
    },
    insertOrUpdateDataItemAction({ commit }, item) {
      commit("insertOrUpdateTableDataItemMutation", item);
      commit("closeTableDrawerMutation");

    },
    setEditRecordAction({ commit }, record) {
      //set (bind) record and open drawer
      this.state.editingrecord = record;
      commit("openTableDrawerMutation");
    },
    setRecordAction({ commit }, record) {
      //only set (bind) record to be deleted
      this.state.editingrecord = record;
    },
  },
  modules: {
  }
})
