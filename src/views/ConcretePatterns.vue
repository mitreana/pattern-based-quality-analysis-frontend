<template>
  <div class="card-body py-0">
    <div class="concretePatternsView card">
      <h3 ref="title" class="card-title my-4 mx-2">Concrete Patterns</h3>
      <ConcretePatternTable></ConcretePatternTable>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import Navbar from "../components/Navbar.vue";
import ConcretePatternTable from "../components/ConcretePatternTable.vue";
import SelectInput from "../components/inputs/SelectInput.vue";

export default {
  name: "ConcretePatterns",
  computed: mapState({
    activeConcretePattern: (state) => state.activeConcretePattern,
  }),
  methods: { ...mapActions(["callConcretePatternText"]) },
  components: {
    Navbar,
    ConcretePatternTable,
    SelectInput,
  },
  created() {
    if (this.activeConcretePattern && this.activeConcretePattern.length > 0) {
      this.callConcretePatternText(this.activeConcretePattern);
    }
  },
};
</script>
<style>
.concretePatternsView {
  width: 90%;
  margin: auto;
  padding-top: 0%;
}
</style>
