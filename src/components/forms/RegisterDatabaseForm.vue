<template>
  <div class="database card" >
    <div
      v-if="databases.length == 0 || registerDatabaseComponent === true"
      class="form"
    >
      <p>REGISTER DATABASE</p>

      <el-form
        size="mini"
        ref="data"
        :model="data"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item
          label="User"
          prop="user"
          :rules="[{ required: true, message: 'Field is required' }]"
        >
          <el-input
            v-model="data.user"
            autocomplete="on"
            @input="enterUser"
          ></el-input
        ></el-form-item>

        <el-form-item
          label="Password"
          prop="password"
          :rules="[{ required: true, message: 'Field is required' }]"
        >
          <el-input
            v-model="data.password"
            autocomplete="on"
            @input="enterPassword"
          ></el-input
        ></el-form-item>

        <el-form-item
          label="Localname"
          prop="localname"
          :rules="[{ required: true, message: 'Field is required' }]"
        >
          <el-input
            v-model="data.localname"
            autocomplete="on"
            @input="enterLocalname"
          ></el-input
        ></el-form-item>

        <el-form-item
          label="Host"
          prop="host"
          :rules="[{ required: true, message: 'Field is required' }]"
        >
          <el-input
            v-model="data.host"
            autocomplete="on"
            @input="enterHost"
          ></el-input
        ></el-form-item>

        <el-form-item
          label="Port"
          prop="port"
          :rules="[{ required: true, message: 'Field is required' }]"
        >
          <el-input
            v-model="data.port"
            autocomplete="on"
            @input="enterPort"
          ></el-input
        ></el-form-item>

        <el-form-item
          label="Name"
          prop="name"
          :rules="[{ required: true, message: 'Field is required' }]"
        >
          <el-input
            v-model="data.name"
            autocomplete="on"
            @input="enterName"
          ></el-input
        ></el-form-item>

        <el-form-item>
          <el-button @click="openDatabasesTable" v-if="this.databases.length > 0">Databases</el-button>
          <el-button type="primary" @click="submitForm('data')"
            >Submit</el-button
          >
          <el-button @click="resetForm('data')">Reset</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- <div class="or">
      <p>OR</p>
  </div>
    <DatabasesTable></DatabasesTable> -->
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  data() {
    return {
      data: {
        localname: "",
        host: "",
        port: "",
        name: "",
        password: "",
        user: "",
      },
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
  }),
  methods: {
    ...mapActions([
      "callDatabases",
      "onUserDatabaseChoice",
      "onUserDatabaseRegistration",
      "clearMessages",
      "onShowregisterDatabasecomponentOrNot",
    ]),
    submitForm(formName) {
      this.callDatabases;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    selectDatabase: function(value) {
      this.onUserDatabaseChoice(value);
    },
    enterUser: function(value) {
      this.user = value;
      console.log(" ist" + this.user);
    },
    enterPassword: function(value) {
      this.password = value;
      console.log("Password ist  " + this.password);
    },
    enterLocalname: function(value) {
      this.localname = value;
      console.log("localname ist  " + this.localname);
    },
    enterHost: function(value) {
      this.host = value;
      console.log("Host ist  " + this.host);
    },
    enterPort: function(value) {
      this.port = String(value);
      console.log("port ist  " + typeof this.port);
    },
    enterName: function(value) {
      this.name = value;
      console.log("name ist  " + this.name);
    },
    openNotification(title, message, type) {
      this.$notify({
        title,
        message,
        type,
        position: "bottom-right",
      });
    },
    async onSubmit() {
      await this.onUserDatabaseRegistration({
        user: this.user,
        password: this.password,
        localname: this.localname,
        port: this.port,
        host: this.host,
        name: this.name,
      });
    },
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          await this.onSubmit();
          if (this.successMessage.length > 0) {
            this.callDatabases();
            this.openNotification(
              this.successMessage,
              "Database successfully registered!",
              "success"
            );
            this.onShowregisterDatabasecomponentOrNot(false);
          }
          if (this.errorMessage.length > 0) {
            this.openNotification(
              this.errorMessage,
              "Something went wrong Please try again!",
              "error"
            );
          }
        }
      });
      this.clearMessages();
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    openDatabasesTable() {
      this.onShowregisterDatabasecomponentOrNot(false);
    },
  },
  created() {
    this.callDatabases();
  },
  unmounted() {
    this.onShowregisterDatabasecomponentOrNot(false);
  },
};
</script>

<style scoped>
.el-form {
  width: 50%;
  margin: auto;
}
/* .database{
    margin: auto;
    display:flex;
    width: 80%;
    
} */
.or {
  margin: auto;
  opacity: 40%;
}
.top {
  display: inline-flex;
  margin: auto;
}
</style>
