<template>
  <el-input-number
    v-model="numberInputValue"
    @change="onValueChange"
    placeholder="Select a value"
    class="w-100"
  />
</template>

<script>
export default {
  props: ["value", "change"],
  data() {
    return {
      numberInputValue: Number(this.value),
    };
  },
  methods: {
    onValueChange(value) {
      this.change(value);
    },
  },
};
</script>
