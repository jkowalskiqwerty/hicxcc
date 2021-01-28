<template>
  <div>
    <h1>Table Design</h1>

    <div class="row">
      <h2>Table Title</h2>
      <a-button @click="mthOpenDrawer">Create</a-button>
    </div>

    <a-drawer
      title="Data"
      placement="right"
      :visible="isDrawerOpened()"
      @close="mthCloseTableDrawer()"
    >
      <!-- :closable="true" -->
      <h1>Add/edit Table item</h1>
      <label>Title</label>
      <a-input
        name="title"
        type="text"
        v-model="title"
        placeholder="please enter title"
      />
      <label>Status</label>

      <a-select
        :value="status"
        label-in-value
        :default-value="{ key: '' }"
        style="width: 100%; margin-left: 0px"
        placeholder="choose status"
        @change="mthStatusChanged"
      >
        <a-select-option value="draft">draft</a-select-option>
        <a-select-option value="published">published</a-select-option>
        <a-select-option value="pending">pending</a-select-option>
      </a-select>

      <!-- <select v-model="status" style="width: 100%; margin-left: 0px">
        <option value=""></option>
        <option value="draft">draft</option>
        <option value="published">published</option>
        <option value="pending">pending</option>
      </select> -->

      <div class="validation">{{ validation }}</div> 
      <a-button type="danger" block @click="mthSave()">Save</a-button>
    </a-drawer>
    <a-table :columns="columns" :data-source="itemsFromStore" rowKey="id">
      <span slot="status" slot-scope="status">
        <a-tag
          :key="status.label"
          :color="
            status.label == 'draft'
              ? 'volcano'
              : status.label == 'published'
              ? 'geekblue'
              : 'green'
          "
        >
          {{ status.label }}
        </a-tag>
      </span>

      <a-pagination
        :pageSize="1"
        :defaultpageSize="1"
        :total="1"
      ></a-pagination>
      <a slot="name" slot-scope="text">{{ text }}</a>
      <span slot="customTitle"><a-icon type="smile-o" /> Name</span>

      <span slot="action" slot-scope="text, record">
        <a @click="mthEdit(record)">Edit</a>
        |
        <a @click="mthShowDeleteConfirmation(record)">Delete</a>
      </span>
    </a-table>

    <a-modal
      v-model="deleteConfirmationVisible"
      title="Delete Confirmation"
      @ok="mthDelete()"
    >
      <p>Are you sure you want to delete?</p>
    </a-modal>
  </div>
</template>

<script>
export default {
  name: "Table",
  data() {
    return {
      id: 0,
      title: "",
      status: undefined,
      validation: "",
      deleteConfirmationVisible: false,
      columns: [
        {
          title: "ID",
          dataIndex: "id",
          key: "id",
          width: 50,
        },
        {
          title: "Title",
          dataIndex: "title",
          key: "title",
          width: 300,
        },
        {
          title: "Status",
          key: "status",
          dataIndex: "status",
          width: 150,
          scopedSlots: { customRender: "status" },

        },
        {
          title: "Actions",
          key: "action",
          scopedSlots: { customRender: "action" },
          width: 150,
        },
      ],
    };
  },
  computed: {
    itemsFromStore() {
      return this.$store.state.items;
    },
  },
  methods: {
    mthStatusChanged(selectedItems) {
      this.status = selectedItems;
    },
    isAlphanumeric() {
      for (var i = 0; i < this.title.length; i++) {
        var char1 = this.title.charAt(i);
        var cc = char1.charCodeAt(0);

        if (
          (cc > 47 && cc < 58) ||
          (cc > 64 && cc < 91) ||
          (cc > 96 && cc < 123) || char1==' '
        ) {
        } else {
          return false;
        }
      }
      return true;
    },
    mthShowDeleteConfirmation(record) {
      this.$store.dispatch("setRecordAction", record);
      this.deleteConfirmationVisible = true;
    },
    mthDelete() {
      this.$store.dispatch("deleteRecordAction");
      this.deleteConfirmationVisible = false;
      this.$notification.open({
        message: "OK",
        description: "Succesfully deleted.",
        onClick: () => {},
      });
    },
    mthEdit(record) {
      this.id = record.id;
      this.status = record.status;
      this.title = record.title;
      this.$store.dispatch("setEditRecordAction", record);

    },
    mthOpenDrawer() {
      this.id = 0;
      this.title = "";
      this.status = undefined;
      this.validation="";
      this.$store.dispatch("openTableDrawerAction");
    },
    mthCloseTableDrawer() {
      this.$store.dispatch("closeTableDrawerAction");
    },
    mthIsValid() {
      this.validation = "";
      if (this.title.length < 3 || this.title.length > 20) {
        this.validation += "Title length should be between 3 and 20 chars. ";
        return false;
      } else if (this.status == "") {
        this.validation += "Status is required.";
        return false;
      } else if (!this.isAlphanumeric(this.title)) {
        this.validation += "Text can only consits of alphanumeric chars.";
        return false;
      }
      return true;
    },
    mthSave() {
      if (this.mthIsValid()) {
        this.$store.dispatch("insertOrUpdateDataItemAction", {
          id: this.id,
          title: this.title,
          status: this.status,
        });

        var message = "Successfully created.";
        if (this.id != 0) message = "Successfully updated.";

        this.$notification.open({
          message: "OK",
          description: message,
          onClick: () => {},
        });

        this.validation = "";
      }
    },
    isDrawerOpened() {
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
div {
  float: left;
  margin: 20px;
}
.ant-select {
  width: 100%;
  margin-top: 0px;
}
.row {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  float: initial;
}
.validation{
  margin-top: 10px;
}
</style>