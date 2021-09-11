<template>
  <div class="container w-100 ">
    <h3 class="mb-4">Concrete patterns:</h3>
    <select
      class="form-select"
      @change="(event) => callConcretePatternText(event.target.value)"
    >
      <option
        v-for="item in concretePatterns"
        :key="item"
        :value="item"
        :selected="
          activeConcretePattern &&
            activeConcretePattern.length > 0 &&
            activeConcretePattern === item
        "
        >{{ item }}</option
      >
    </select>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import DateTimeInput from "../components/inputs/DateTimeInput.vue";
export default {
  name: "ConcretePatternsList",
  components: { DateTimeInput },
  computed: mapState({
    concretePatterns: (state) => {
      return state.concretePatterns;
    },
    validationErrors: (state) => {
      return state.validationErrors;
    },
    submitted: (state) => {
      return state.submitted;
    },
    activeConcretePattern: (state) => {
      return state.activeConcretePattern;
    },
  }),
  methods: {
    ...mapActions([
      "onUserConcretePatternChoice",
      "callConcretePatterns",
      "callConcretePatternText",
    ]),
    showPatterns: function(event) {
      this.onUserConcretePatternChoice(event.target.value);
    },
  },
  created() {
    this.callConcretePatterns();
  },
};
</script>
