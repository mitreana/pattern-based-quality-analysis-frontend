<template>
  <div class="concretePattern row">
    <SentenceText :fragments="fragments" />
    <SentenceParameter
      v-if="activeParameter && Object.keys(activeParameter).length > 0"
      :activeParameter="activeParameter"
    />

    <div id="name">
      <el-form-item
        label="Pattern Description"
        class=" description d-flex flex-column text-justify"
        v-if="
          sentenceDetails.PatternName && sentenceDetails.PatternName.length > 0
        "
      >
        <el-input
          type="textarea"
          class="w-100"
          v-model="sentenceDetails.PatternDescription"
          @input="updateDescription"
        >
        </el-input>
      </el-form-item>
      <el-collapse class="concrete-pattern-info">
        <el-collapse-item class="details" title="Show Pattern Details">
          <div>
            <p>Name : {{ sentenceDetails.PatternName }}</p>
            <p>
              Text Name :
              {{ sentenceDetails.PatternTextName }}
            </p>
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
    <div>
      <el-button
        class="finalizeButton"
        type="primary"
        plain
        @click="finalize"
        :loading="loading"
        >{{
          loading ? "Finalizing Concretisation" : "Finalize Concretisation"
        }}</el-button
      >
    </div>
  </div>
</template>

<script>
import SentenceText from "../sentence/SentenceText.vue";
import SentenceParameter from "../sentence/SentenceParameter.vue";
import { mapActions, mapState } from "vuex";

export default {
  props: ["fragments", "sentenceDetails"],
  components: { SentenceParameter, SentenceText },
  data: () => {
    return {
      loading: false,
    };
  },
  computed: {
    ...mapState({
      activeParameter: (state) => {
        return state.activeParameter;
      },
      successMessage: (state) => {
        return state.successMessage;
      },
      errorMessage: (state) => {
        return state.errorMessage;
      },
      parameterExplanations: (state) => {
        return state.parameterExplanations;
      },
      concretePatternParameters: (state) => {
        return state.concretePatternParameters;
      },
      userDatabase: (state) => {
        return state.userDatabase;
      },
    }),
  },
  methods: {
    ...mapActions([
      "onInitializeParameters",
      "callConcretePatternText",
      "onFinalization",
      "onValidatePatternAgainstSchema",
      "toggleEmptyErrorMessage",
      "onCallConcretePatternParameterExplanations",
      "onSetPatternDescription",
    ]),
    async finalize() {
      this.loading = true;
      if (this.userDatabase[this.sentenceDetails.PatternName]) {
        this.toggleEmptyErrorMessage(false);
        const params = this.$route.params;
        await this.onValidatePatternAgainstSchema(params.concretePatternName);
        if (this.successMessage.length > 0) {
          await this.onFinalization(params.concretePatternName);
          if (this.successMessage.length > 0) {
            this.openNotification(
              "Success Message",
              this.successMessage,
              "success"
            );
          } else {
            this.openNotification(
              "Error Message",
              `Please enter a value for each input!\n${this.errorMessage}`,
              "error"
            );
          }
        }
        if (this.errorMessage.length > 0) {
          if (this.errorMessage.includes("500")) {
            this.openNotification(
              "Error Message",
              `Please enter reasonable values for each input!`,
              "error"
            );
          } else {
            this.openNotification(
              "Error Message",
              `Please enter reasonable values for each input!`,
              "error"
            );
          }
        }
      } else {
        this.toggleEmptyErrorMessage(true);
      }
      this.loading = false;
    },
    openNotification(title, message, type) {
      this.$notify({
        title,
        message,
        type,
        position: "bottom-right",
      });
    },
    updateDescription() {
      if (this.timeoutFn) {
        clearTimeout(this.timeoutFn);
      }
      this.selectedDescription = this.sentenceDetails.PatternDescription;
      this.timeoutFn = setTimeout(async () => {
        await this.setPatternDescription();
      }, 1000);
    },
    async setPatternDescription() {
      const params = this.$route.params;
      await this.onSetPatternDescription({
        concretePatternName: params.concretePatternName,
        description: this.selectedDescription,
      });
    },
  },
  created() {
    if (!this.parameterExplanations) {
      this.onCallConcretePatternParameterExplanations();
    }
  },
};
</script>

<style scoped>
.finalizeButton {
  margin: auto;
  display: flex;
}
.el-collapse-item {
  text-align: start;
  margin-top: 2%;
  margin-left: 1%;
}

#name {
  margin-bottom: 3%;
}
.description {
  font-weight: bold;
  margin-left: 1%;
}
</style>
