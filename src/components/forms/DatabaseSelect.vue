<template>
  <div class="select">
    <el-form-item
      :error="showEmptyErrorMessage ? 'Please select a database' : ''"
      :show-message="showEmptyErrorMessage"
    >
      <el-select
        v-model="selectedDatabase"
        placeholder="Select a Database"
        @change="selectDatabase"
        :no-data-text="
          databases.length == 0
            ? 'No database. Please register a database first. '
            : 'No data'
        "
      >
        <el-option
          v-for="item in databases"
          :key="item.LocalName"
          :value="item.LocalName"
          :title="
            `Host : ${item.Host}, Port : ${item.Port}, Name : ${item.Name}`
          "
          :selected="item.LocalName === defaultDatabase.LocalName"
        >
          {{ item.LocalName }}
        </el-option>
      </el-select>
    </el-form-item>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import RegisterDatabaseForm from "../forms/RegisterDatabaseForm.vue";

export default {
  components: { RegisterDatabaseForm },
  data() {
    return {
      selectedDatabase: "",
      params: this.$route.params.concretePatternName,
      setDatabaseSuccessMessage: "",
      setDatabaseErrorMessage: "",
    };
  },
  computed: mapState({
    databases: (state) => {
      return state.databases;
    },
    userDatabase: (state) => {
      return state.userDatabase;
    },
    errorMessage: (state) => {
      return state.errorMessage;
    },
    successMessage: (state) => {
      return state.successMessage;
    },
    registerDatabaseComponent: (state) => {
      return state.registerDatabaseComponent;
    },
    showEmptyErrorMessage: (state) => {
      return state.showEmptyErrorMessage;
    },
  }),
  props: ["defaultDatabase"],
  methods: {
    ...mapActions([
      "callDatabases",
      "onUserDatabaseChoice",
      "clearMessages",
      "onDeleteDatabase",
      "onShowregisterDatabasecomponentOrNot",
      "onSetDatabaseOfPattern",
      "toggleEmptyErrorMessage",
      "callDatabaseOfPattern",
    ]),

    selectDatabase: function(value) {
      this.onUserDatabaseChoice(value);
      this.setDatabaseOfPattern();
      this.toggleEmptyErrorMessage(false);
    },
    openNotification(title, message, type) {
      this.$notify({
        title,
        message,
        type,
        position: "bottom-right",
      });
    },
    async setDatabaseOfPattern() {
      const params = this.$route.params.concretePatternName;
      await this.onSetDatabaseOfPattern({
        localName: this.selectedDatabase,
        patternName: params,
      });
      // if (this.successMessage.length > 0) {
      //   this.openNotification("Success", this.successMessage, "success");
      // }

      // if (this.errorMessage.length > 0) {
      //   this.openNotification("Error", this.errorMessage, "danger");
      // }

      this.clearMessages();
    },
    openRegisterComponent() {
      this.onShowregisterDatabasecomponentOrNot(true);
    },
  },
  created() {
    this.callDatabases();
  },
  updated() {
    this.selectedDatabase = this.defaultDatabase.LocalName;
  },
};
</script>

<style scoped>
.select {
  width: 100%;
  display: inline-flex;
  margin: auto;
}
.el-select {
  margin: auto;
  margin-right: 3%;
  margin-left: 0%;
}
.set {
  display: inline-flex;
  margin-bottom: 1rem;
  margin: auto;
  margin-left: 2%;
  margin-right: 2%;
}
</style>
