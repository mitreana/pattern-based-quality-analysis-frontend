<template>
  <div class="concretePattern row">
    <SentenceText :fragments="fragments" />
    <SentenceParameter
      v-if="activeParameter && Object.keys(activeParameter).length > 0"
      :activeParameter="activeParameter"
    />
  </div>
  <el-button type="primary" plain @click="finalize"
    >Finalize Concretisation</el-button
  >
</template>

<script>
import SentenceText from "../sentence/SentenceText.vue";
import SentenceParameter from "../sentence/SentenceParameter.vue";
import { mapActions, mapState } from "vuex";

export default {
  props: ["fragments"],
  components: { SentenceParameter, SentenceText },
  computed: {
    ...mapState({
      activeParameter: (state) => {
        return state.activeParameter;
      },
    }),
  },
  methods: {
    ...mapActions([
      "onInitializeParameters",
      "callConcretePatternText",
      "onFinalization",
    ]),
    async finalize() {
      const params = this.$route.params;
      await this.onFinalization(params.concretePatternName);
      if (this.successMessage.length > 0) {
        this.openNotification(
          "Success Message",
          this.successMessage,
          "success"
        );
      } else {
        this.openNotification("Error Message", this.errorMessage, "error");
      }
    },
    openNotification(title, message, type) {
      this.$notify({
        title,
        message,
        type,
        position: "bottom-right",
      });
    },
  },
  computed: mapState({
    activeParameter: (state) => {
      return state.activeParameter;
    },
    concretePatternParameters: (state) => {
      return state.concretePatternParameters;
    },
    successMessage: (state) => {
      return state.successMessage;
    },
    errorMessage: (state) => {
      return state.errorMessage;
    },
  }),
};
</script>
