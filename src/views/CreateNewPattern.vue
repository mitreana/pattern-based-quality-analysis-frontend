<template>
  <div class="createNewPattern w-100" >
    <h3 ref="title">Create a new pattern:</h3>
    <form ref="concretePatternForm">
      <AbstractPatterns></AbstractPatterns>
      <AbstractPatternTexts></AbstractPatternTexts>
    </form>
    <button
      type="button"
      class="btn btn-primary d-inline-block w-90 my-3"
      style="width: 250px"
      @click="
        () => {
          onSubmit();
        }
      "
    >
      Next
    </button>

    <div class="row justify-content-center" v-if="loading">
      <Spinner />
    </div>

    <div class="alert alert-danger w-50 mx-auto" v-if="errorMessage.length > 0">
      {{ errorMessage }}
    </div>
    <div
      class="alert alert-success w-50 mx-auto"
      v-if="successMessage.length > 0"
    >
      {{ successMessage }} Redirecting to concrete pattern page...
    </div>
  </div>
  <router-view />
</template>

<script>
import AbstractPatterns from "../components/AbstractPatterns.vue";
import AbstractPatternTexts from "../components/AbstractPatternTexts.vue";
import Navbar from "../components/Navbar.vue";
import Spinner from "../components/utilities/Spinner.vue";
import { mapState, mapActions } from "vuex";

export default {
  name: "CreateNewPattern",
  components: {
    AbstractPatterns,
    AbstractPatternTexts,
    Navbar,
    Spinner,
  },

  data: () => {
    return {
      timeout: false,
      form: null,
      loading: false,
    };
  },

  computed: mapState({
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
    activeConcretePattern: (state) => {
      return state.activeConcretePattern;
    },
  }),

  methods: {
    ...mapActions([
      "onCreateConcretePattern",
      "clearMessages",
      "resetUserConcretePatternInformation",
      "onActiveConcretePatternChoice",
    ]),
    onTimeout() {
      
      setTimeout(() => {
        this.goToJustCreatedConcretePattern();
        this.resetUserConcretePatternInformation();
        this.clearMessages();
      }, 5000);
    },
    async onSubmit() {
      const { concretePatternForm } = this.$refs;
      concretePatternForm.reset();
      this.loading = true;
      await this.onCreateConcretePattern({
        abstractPattern: this.userAbstractPattern,
        abstractPatternText: this.userAbstractPatternText,
        concretePatternName: this.userConcretePatternName,
      });
      this.loading = false;
      this.onTimeout();
    },
    goToJustCreatedConcretePattern() {
      if (this.successMessage.length > 0) {
        this.getConcrtePatternName();
        this.$router.push("/concretePatterns");
      }
    },
    getConcrtePatternName() {
      console.log("Concrete pattern name is", this.userConcretePatternName);
      this.onActiveConcretePatternChoice(this.userConcretePatternName);
    },
  },
};
</script>


