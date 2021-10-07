<template>
  <el-form :model="form" ref="form" label-position="left">
    <div class="container my-4">
      <el-form-item
        prop="Abstract Pattern"
        label="Abstract Pattern"
        required
        class="d-flex flex-column text-justify"
      >
        <el-select
          v-model="form['Abstract Pattern']"
          placeholder="Select an abstract pattern"
          @change="selectAbstractPattern"
          class="w-100"
        >
          <el-option
            v-for="item in abstractPatterns"
            :key="item"
            :label="item"
            :value="item"
          >
          </el-option>
        </el-select>
      </el-form-item>
    </div>
    <div class="container my-4">
      <el-form-item
        prop="Abstract Pattern Text"
        label="Abstract Pattern Text"
        required
        class="d-flex flex-column text-justify"
      >
        <el-select
          v-model="form['Abstract Pattern Text']"
          placeholder="Select an abstract pattern text"
          @change="selectAbstractPatternText"
          class="w-100"
          :no-data-text="
            userAbstractPattern.length === 0
              ? 'No data. Please select an abstract pattern first'
              : 'No data'
          "
        >
          <el-option
            v-for="item in abstractPatternTexts"
            :key="item"
            :label="item"
            :value="item"
          >
          </el-option>
        </el-select>
      </el-form-item>
    </div>
    <div class="container my-4">
      <el-form-item
        prop="Concrete Pattern Name"
        label="Concrete Pattern Name"
        required
        class="d-flex flex-column text-justify"
      >
        <el-input
          placeholder="Enter a name for the concrete pattern that does not exist already"
          required
          v-model="form['Concrete Pattern Name']"
          @input="enterConcretePatternName"
        ></el-input>
      </el-form-item>
    </div>
    <div class="container my-4">
      <el-button type="warning" plain @click="resetForm('form')"
        >Reset</el-button
      >
      <el-button
        type="success"
        @click="
          () => {
            submitForm('form'), onTimeout();
          }
        "
        >Create</el-button
      >
    </div>
  </el-form>
</template>

<style>
.container {
  width: 100px;
}
</style>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "AbstractPatterns",
  data() {
    return {
      form: {
        "Abstract Pattern": "",
        "Abstract Pattern Text": "",
        "Concrete Pattern Name": "",
      },
      done: true,
    };
  },
  computed: mapState({
    abstractPatterns: (state) => {
      return state.abstractPatterns;
    },
    abstractPatternTexts: (state) => {
      return state.abstractPatternTexts;
    },
    userAbstractPattern: (state) => {
      return state.userAbstractPattern;
    },
    userAbstractPatternText: (state) => {
      return state.userAbstractPatternText;
    },
    userConcretePatternName: (state) => {
      return state.userConcretePatternName;
    },
    errorMessage: (state) => {
      return state.errorMessage;
    },
    successMessage: (state) => {
      return state.successMessage;
    },
    concretePatterns: (state) => {
      return state.concretePatterns;
    },
  }),

  methods: {
    ...mapActions([
      "onUserAbstractPatternChoice",
      "onUserAbstractPatternTextChoice",
      "callAbstractPatterns",
      "onUserConcretePatternNameChoice",
      "onCreateConcretePattern",
      "resetUserConcretePatternInformation",
      "callConcretePatterns",
    ]),

    
    selectAbstractPattern: function(value) {
      this.onUserAbstractPatternChoice(value);
    },
    selectAbstractPatternText: function(value) {
      this.onUserAbstractPatternTextChoice(value);
    },
    enterConcretePatternName: function(value) {
      this.onUserConcretePatternNameChoice(value);
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
      await this.onCreateConcretePattern({
        abstractPattern: this.userAbstractPattern,
        abstractPatternText: this.userAbstractPatternText,
        concretePatternName: this.userConcretePatternName,
      });
    },
    getCorrectErrorMessage() {
      const str = this.errorMessage;
      if (str.includes("409")) {
        this.openNotification(
          "Error Message",
          "Please give another name that does not exist already!",
          "error"
        );
      } else {
        this.openNotification("Error Message", this.errorMessage, "error");
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          await this.onSubmit();
          if (this.successMessage.length > 0) {
            this.callConcretePatterns;
            this.openNotification(
              "Redirecting to newly created Pattern ...",
              this.successMessage,
              "success"
            );
            this.callConcretePatterns;
            this.onTimeout();
          } else if (this.errorMessage.length > 0) {
            this.getCorrectErrorMessage();
          }
        } else {
          return false;
        }
        if (!this.done) {
          this.resetForm("form");
        }
      });
    },
    onTimeout() {
      setTimeout(() => {
        if (
          this.successMessage &&
          this.successMessage.length > 0 &&
          this.done
        ) {
          this.$router.push(
            `/concretePatterns/edit/${this.userConcretePatternName}`
          );
          this.done = false;
        }
      }, 6000);
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.resetUserConcretePatternInformation();
    },
  },

  created() {
    this.callAbstractPatterns();
  },
 
};
</script>

<style></style>
