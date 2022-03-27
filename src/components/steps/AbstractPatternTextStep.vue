<template>
  <div class="abstract-pattern-text-step-container">
    <p class="description-text">
      Click on any abstract pattern text in order to select it.
    </p>
    <el-scrollbar height="400px">
      <p class="info">
        Variant texts of abstract pattern :
        {{ this.abstractPatternTexts[0].PatternName }}
      </p>
      <div
        class="card abstract-pattern-text-card"
        v-for="abstractPatternText in abstractPatternTexts"
        :key="abstractPatternText"
        :style="{
          borderColor:
            userAbstractPatternText === abstractPatternText.PatternTextName
              ? 'rgb(51, 204, 255)'
              : '',
        }"
        @click="() => selectAbstractPatternText(abstractPatternText)"
      >
        <p class="card-title">
          {{ abstractPatternText.PatternTextName }}
        </p>
        <div class="card-body">
          <ReadonlySentence :fragments="abstractPatternText.Fragments" />
        </div>
      </div>
    </el-scrollbar>
    <div v-if="!userAbstractPatternText && nextStepClicked">
      <el-alert
        class="alert"
        title="Please select an abstract pattern text"
        type="error"
        show-icon
      >
      </el-alert>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import ReadonlySentence from "../sentence/ReadonlySentence.vue";

export default {
  name: "AbstractPatternTexts",
  components: { ReadonlySentence },
  props: ["nextStepClicked"],
  data() {
    return { selectedAbstractPatternText: "" };
  },
  computed: mapState({
    userAbstractPattern: (state) => {
      return state.userAbstractPattern;
    },
    abstractPatternTexts: (state) => {
      return state.abstractPatternTexts;
    },
    userAbstractPatternText: (state) => {
      return state.userAbstractPatternText;
    },
  }),
  methods: {
    ...mapActions(["onUserAbstractPatternTextChoice"]),
    selectAbstractPatternText(abstractPatternText) {
      this.selectedAbstractPatternText = abstractPatternText.PatternTextName;
      this.onUserAbstractPatternTextChoice(abstractPatternText.PatternTextName);
    },
  },
};
</script>

<style scoped>
.abstract-pattern-step-title {
  padding: 1rem;
  opacity: 0.6;
}

.abstract-pattern-text-card {
  width: 80%;
  border-radius: 2px;
  margin: auto;
  text-align: left;
  padding: 1rem;
  cursor: pointer;
  margin-bottom: 1rem;
}

.abstract-pattern-text-card p {
  opacity: 0.6;
}

.abstract-pattern-info {
  width: 80%;
  margin: auto;
  margin-bottom: 2%;
  margin-top: 2%;
  text-align: left;
}

.description-text {
  opacity: 0.5;
  margin-top: 1rem;
}

.alert {
  width: 80%;
  margin: auto;
}
.info {
  text-align: left;
  width: 80%;
  margin: auto;
}
</style>
