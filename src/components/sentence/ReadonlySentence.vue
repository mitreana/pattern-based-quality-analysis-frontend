<template>
  <small :style="{ fontWeight: 100, fontStyle: 'italic' }">Example:</small>
  <br>
  <small>
    <span v-for="fragment in fragments" :key="fragment">
      <span v-if="typeof fragment === 'string'">{{ fragment }}</span>
      <el-tag
        class="mx-1 my-1"
        v-if="
          typeof fragment === 'object' &&
            fragment.ExampleValue &&
            fragment.ExampleValue.length > 0
        "
        >{{ fragment.ExampleValue }}</el-tag
      >
    </span>
  </small>
</template>

<script>
export default {
  props: ["fragments"],
  created() {
    console.log(this.fragments);
  },
};
</script>
