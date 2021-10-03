<template>
  <el-select
    @change="
      (value) => {
        change(value);
      }
    "
    v-model="selectValue"
    class="w-100"
  >
    <el-option
      v-for="item in options"
      :key="item"
      :value="item"
      :selected="item === value"
    >
      {{ item }}
    </el-option>
  </el-select>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  props: ["options", "value", "change"],
  data() {
    return {
      selectValue: this.value,
    };
  },
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
