<template>
  <input
    type="text"
    class="form-control"
    :value="value"
    @input="
      (event) => {
        change(event.target.value);
      }
    "
  />
</template>

<script>
export default {
  props: ["value", "change"],
};
</script>
