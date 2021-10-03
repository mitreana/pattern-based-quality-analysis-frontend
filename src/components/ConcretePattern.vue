<template>
  <div class="concretePattern row">
    <Sentence :fragments="fragments" />
    <div
      v-for="(fragment, index) in fragments"
      :key="index"
      class="d-inline-block col-12"
    >
      <Parameter
        v-if="typeof fragment === 'object' && fragment.URL === activeParameter"
        :type="
          concretePatternParameters[fragment.URL] &&
          concretePatternParameters[fragment.URL].type
            ? concretePatternParameters[fragment.URL].type
            : null
            
        "
        :fragment="fragment"
      />
    </div>
  </div>
</template>

<script>
import Sentence from "./Sentence.vue";
import Parameter from "./Parameter.vue";
import { mapActions, mapState } from "vuex";

export default {
  props: ["fragments"],
  components: { Parameter, Sentence },
  methods: {
    ...mapActions(["onInitializeParameters"]),
  },
  computed: mapState({
    activeParameter: (state) => {
      return state.activeParameter;
    },
    concretePatternParameters: (state) => {
      return state.concretePatternParameters;
    },
  }),
};
//border-color: #c2dbfe;
</script>
