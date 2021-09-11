<template>
  <div class="container w-100 my-4">
    <select
      :class="
        `form-select w-80 ${validationErrors.abstractPattern &&
          submitted &&
          'is-invalid'}`
      "
      @change="showTexts"
      v-if="abstractPatterns.length > 0"
      name="abstract-pattern"
    >
      <option value="default" selected>Select an abstract pattern</option>
      <option v-for="item in abstractPatterns" :key="item" :value="item">
        {{ item }}
      </option>
    </select>
    <div class="invalid-feedback" v-if="validationErrors.abstractPattern">
      Please select an abstract pattern
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
  name: "AbstractPatterns",
  computed: mapState({
    userAbstractPattern: (state) => {
      return state.userAbstractPattern;
    },
    abstractPatterns: (state) => {
      return state.abstractPatterns;
    },
    validationErrors: (state) => {
      return state.validationErrors;
    },
    submitted: (state) => {
      return state.submitted;
    },
  }),

  methods: {
    ...mapActions(["onUserAbstractPatternChoice", "callAbstractPatterns"]),

    // mapActions is a method which returs an object with the methods which names
    // we have declared on the array taken as the first argument
    showTexts: function(event) {
      this.onUserAbstractPatternChoice(event.target.value);
    },
  },

  created() {
    this.callAbstractPatterns();
  },
};
</script>
