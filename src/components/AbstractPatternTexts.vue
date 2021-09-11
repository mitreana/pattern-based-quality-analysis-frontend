<template>
  <div class="container">
    <select
      :class="
        `form-select w-80 ${validationErrors.abstractPatternText &&
          submitted &&
          'is-invalid'}`
      "
      @change="onSelect"
      :disabled="abstractPatternTexts.length === 0"
      name="abstract-pattern-text"
    >
      <option value="default" selected>Select an abstract pattern text</option>
      <option v-for="item in abstractPatternTexts" :key="item" :value="item">
        {{ item }}
      </option>
    </select>

    <div class="invalid-feedback" v-if="validationErrors.abstractPatternText">
      Please select an abstract pattern text
    </div>

    <input
      type="text"
      :class="
        `form-control mt-4 ${validationErrors.concretePatternName &&
          submitted &&
          'is-invalid'}`
      "
      placeholder="Enter a name for the concrete pattern that does not exist already"
      @input="onInput"
      :disabled="userAbstractPatternText.length === 0"
      name="concrete-pattern-name"
    />

    <div class="invalid-feedback" v-if="validationErrors.concretePatternName">
      Please enter a concrete pattern name that does not exist already
    </div>
  </div>
</template>

<style>
.container {
  width: 100px;
}
</style>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "AbstractPatternTexts",
  methods: {
    ...mapActions([
      "onUserAbstractPatternTextChoice",
      "onUserConcretePatternNameChoice",
    ]),
    onSelect(event) {
      this.onUserAbstractPatternTextChoice(event.target.value);
    },
    onInput(event) {
      this.onUserConcretePatternNameChoice(event.target.value);
    },
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
    abstractPatternTexts: (state) => {
      return state.abstractPatternTexts;
    },
    validationErrors: (state) => {
      return state.validationErrors;
    },
    submitted: (state) => {
      return state.submitted;
    },
  }),
};
</script>
