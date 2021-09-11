<template>
  <select
    class="form-select w-80"
    @change="
      (event) => {
        change(event.target.value);
      }
    "
  
  >
    <option
      v-for="item in options"
      :key="item"
      :value="item"
      :selected="item === value"
    >
      {{ item }}
    </option>
  </select>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  props: ["options", "value", "change"],
  computed: mapState({
    concretePatternTextObject: (state) => {
      return state.concretePatternTextObject;
    },
    userParameterValue: (state) => {
      return state.userParameterValue;
    },
  }),
  methods: {
    ...mapActions(["onConcretizeParameter", "onUserParameterValueChoice"]),
    onClick() {
      this.onConcretizeParameter();
    },
  },
};
</script>
