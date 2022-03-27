<template>

      <h3 ref="title" class="card-title my-4 mx-2">Concrete Patterns</h3>
      <ConcretePatternTable></ConcretePatternTable>
   
 
</template>

<script>
import { mapState, mapActions } from "vuex";
import ConcretePatternTable from "../components/tables/ConcretePatternTable.vue";


export default {
  name: "ConcretePatterns",
  computed: mapState({
    activeConcretePattern: (state) => state.activeConcretePattern,
  }),
  methods: { ...mapActions(["callConcretePatternText"]) },
  components: {
    ConcretePatternTable,
  },
  created() {
    if (this.activeConcretePattern && this.activeConcretePattern.length > 0) {
      this.callConcretePatternText(this.activeConcretePattern);
    }
  },
};
</script>
<style>
.card {
  width: 80%;
  margin: auto;
  padding-top: 0%;
}


</style>
