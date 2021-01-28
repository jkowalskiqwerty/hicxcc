<template>
  <div class="about">
    <h1>Table</h1>
    <a-button type="primary" @click="mthOpenDrawer">Create</a-button>
    <a-drawer
      title="Data"
      placement="right"
      :visible="isDrawerOpened()"
      :closable="true"
      @close="mthCloseTableDrawer()"
    >
      <h1>Add/edit Table item</h1>
      <form id="app" @submit="checkForm">
        <label for="title">Title</label>
        <input
          name="title"
          type="text"
          v-model="title"
          placeholder="please enter title"
        />
        <label for="status">Status</label>
        <select placeholder="please choose status" name="status">
          <option></option>
          <option>draft</option>
          <option>published</option>
          <option>pending</option>
        </select>
        <br />
        <br />
        <a-button type="danger" @click="mthOpenDrawer" block>Create</a-button>
      </form>
    </a-drawer>
  </div>
</template>

<script>
export default {
  name: "Table",
  data() {
    return {
      title: "",
      status: "",
    };
  },
  methods: {
    mthOpenDrawer() {
      this.$store.dispatch("openTableDrawerAction");
    },
    mthCloseTableDrawer() {
      this.$store.dispatch("closeTableDrawerAction");
    },
    isDrawerOpened() {
      //console.log(this.$store.state.tableDrawerOpened);
      return this.$store.state.tableDrawerOpened;
    },
  },
};
</script>

<style scoped>
label {
  display: block;
  margin-top: 20px;
}
</style>