<template>
  <el-input
    placeholder="Text"
    type="text"
    :value="value"
    @input="
      (value) => {
        change(value);
      }
    "
    v-model="textValue"
    class="w-100"
  />
</template>

<script>
export default {
  props: ["value", "change"],
  data() {
    return {
      textValue: this.value,
    };
  },
};
</script>
