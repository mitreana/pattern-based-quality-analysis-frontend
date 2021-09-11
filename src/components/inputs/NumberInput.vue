<template>
  <input
    type="number"
    class="form-control"
    :value="Number(value)"
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
