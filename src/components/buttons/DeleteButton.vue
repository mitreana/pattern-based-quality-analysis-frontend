<template>
  <button
    id="deleteButton"
    class="btn btn-danger"
    data-bs-toggle="modal"
    data-bs-target="#deleteModal"
  >
    Delete
  </button>
</template>

<script>
import { mapActions } from "vuex";

export default {
  props: ["userConcretePatternName"],
  data: () => {
    return { clicked: false };
  },
  methods: {
    ...mapActions(["onDelete"]),
    async deletePattern() {
      await this.onDelete(this.userConcretePatternName);
      location.reload();
    },
    alert() {
      if (
        confirm(
          `Concrete pattern with name < ${this.userConcretePatternName} > will be permanently deleted!`
        )
      ) {
        this.clicked = true;
        this.deletePattern();
      } else {
        this.clicked = false;
      }
    },
  },
};
</script>

<style>
#deleteButton {
  height: 10%;
}
</style>
