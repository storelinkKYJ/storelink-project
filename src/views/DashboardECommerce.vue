<!-- =========================================================================================
    File Name: DashboardEcommerce.vue
    Description: Dashboard - Ecommerce
    ----------------------------------------------------------------------------------------
    Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
      Author: Pixinvent
    Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>
  <a-table :columns="columns" :data-source="data" bordered>
    <template
      v-for="col in [
        'userName',
        'userPhone',
        'email',
        'init',
        'eventdttm',
        'uid',
      ]"
      :slot="col"
      slot-scope="text, record"
    >
      <div :key="col">
        <a-input
          v-if="record.editable"
          style="margin: -5px 0"
          :value="text"
          @change="(e) => handleChange(e.target.value, record.key, col)"
        />
        <template v-else>
          {{ text }}
        </template>
      </div>
    </template>
    <template slot="operation" slot-scope="text, record">
      <div class="editable-row-operations">
        <span v-if="record.editable">
          <a @click="() => save(record.key)">Save</a>

          <a :disabled="editingKey == ''" @click="() => cancel(record.key)"
            >delete</a
          >
        </span>
        <span v-else>
          <a :disabled="editingKey !== ''" @click="() => edit(record.key)"
            >Edit</a
          >
        </span>
      </div>
    </template>
  </a-table>
</template>

<script>
import firebase from "firebase";
const data = [];
const columns = [
  {
    title: "userName",
    dataIndex: "userName",
    width: "25%",
    scopedSlots: { customRender: "name" },
  },
  {
    title: "userPhone",
    dataIndex: "userPhone",
    width: "15%",
    scopedSlots: { customRender: "userPhone" },
  },
  {
    title: "email",
    dataIndex: "email",
    width: "40%",
    scopedSlots: { customRender: "email" },
  },
  {
    title: "init",
    dataIndex: "init",
    scopedSlots: { customRender: "init" },
  },
  {
    title: "eventdttm",
    dataIndex: "eventdttm",
    scopedSlots: { customRender: "eventdttm" },
  },
  {
    title: "uid",
    dataIndex: "uid",
    scopedSlots: { customRender: "uid" },
  },
  {
    title: "operation",
    dataIndex: "operation",
    scopedSlots: { customRender: "operation" },
  },
];

export default {
  data() {
    return {
      data,
      columns,
      editingKey: "",
    };
  },

  mounted() {
    const self = this;
    const sref = firebase.database().ref("user/");
    sref.on("value", function (sdata) {
      sdata.forEach(function (sdatas) {
        const _t = {
          key: sdatas.key,
          userName: sdatas.val().userName,
          userPhone: sdatas.val().userPhone,
          email: sdatas.val().email,
          init: sdatas.val().init,
          eventdttm: sdatas.val().eventdttm,
          uid: sdatas.val().uid,
          editable: false,
        };
        self.data.push(_t);
      });
    });

    // console.log(this.data);
  },
  methods: {
    handleChange(value, key, column) {
      const newData = [...this.data];
      const target = newData.filter((item) => key === item.key)[0];
      if (target) {
        target[column] = value;
        this.data = newData;
      }
    },
    edit(key) {
      const newData = [...this.data];
      const target = newData.filter((item) => key === item.key)[0];
      this.editingKey = key;
      if (target) {
        target.editable = true;
        this.data = newData;
      }
    },
    save(key, value, column, record) {
      const newData = [...this.data];
      const target = newData.filter((item) => key === item.key)[0];
      let newPostKey = firebase.database().ref().child("posts").push().key;
      const updateRef = firebase.database().ref(`user/${key}`);
      if (target) {
        target.editable = false;
        this.data = newData;
      }
      console.log(target);
      updateRef.set({
        email: target.email,
        userPhone: target.userPhone,
        init: target.init,
        eventdttm: new Date(),
        uid: target.uid,
        key: newPostKey,
      });
      this.editingKey = "";
    },
    cancel(key) {
      this.data = [];
      const self = this;
      const delRef = firebase.database().ref(`user/${key}`);
      delRef.remove().then(function () {
        alert("del");
        self.editingKey = "";
        key.editable = false;
      });
      const newData = [...this.data];
      const target = newData.filter((item) => key === item.key)[0];
      this.editingKey = key;
      if (target) {
        target.editable = false;
        this.data = newData;
      }
    },
  },
};
</script>

<style scoped>
.editable-row-operations a {
  margin-right: 8px;
}
</style>
