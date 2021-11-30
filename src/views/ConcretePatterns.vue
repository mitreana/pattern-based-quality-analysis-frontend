<template>


  
    <!-- <div class="concretePatternsView card"></div>  -->
      <h3 ref="title" class="card-title my-4 mx-2">Concrete Patterns</h3>
      <!-- <div class="card">
         </div> -->
      <ConcretePatternTable></ConcretePatternTable>
   
 
</template>

<script>
import { mapState, mapActions } from "vuex";
import Navbar from "../components/navigation/Navbar.vue";
import ConcretePatternTable from "../components/tables/ConcretePatternTable.vue";
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
.card {
  width: 80%;
  margin: auto;
  padding-top: 0%;
}


</style>
