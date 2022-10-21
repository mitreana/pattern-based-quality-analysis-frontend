<template>
  <el-checkbox
    class="checkboxValue"
    @change="onValueChange"
    true-label
    v-model="checkboxValue"
    :checked="Boolean(checkboxValue)"
    >True</el-checkbox
  >
</template>

<script>
export default {
  props: ["value", "change"],
  data() {
    return {
      checkboxValue: String(this.value) === "true",
    };
  },
  methods: {
    onValueChange(value) {
      this.change(value === "");
    },
  },
};
</script>

<style scoped>
.checkbox {
  width: 0%;
}
.value-container.col-6 {
  width: 0%;
}
</style>
