<template>
<div>
  <ConcretePatternsList></ConcretePatternsList>
  <ConcretePatternText></ConcretePatternText>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import Navbar from "../components/Navbar.vue";
import ConcretePatternsList from "../components/ConcretePatternsList.vue";
import ConcretePatternText from "../components/ConcretePatternText.vue";
import SelectInput from "../components/inputs/SelectInput.vue";

export default {
  name: "ConcretePatterns",
  computed: mapState({
    activeConcretePattern: (state) => state.activeConcretePattern,
  }),
  methods: { ...mapActions(["callConcretePatternText"]) },
  components: {
    Navbar,
    ConcretePatternsList,
    ConcretePatternText,
    SelectInput,
  },
  created() {
    console.log("Active concrete pattern", this.activeConcretePattern);
    if (this.activeConcretePattern && this.activeConcretePattern.length > 0) {
      this.callConcretePatternText(this.activeConcretePattern);
    }
  },
};
</script>
