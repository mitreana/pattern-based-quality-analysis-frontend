<template>
  <div class="p-5 row">
    <Sentence :fragments="fragments" />
    <h5>Fill in all the parameters!</h5>
    <div
      v-for="fragment in fragments"
      :key="fragment"
      class="d-inline-block m-1 col-12"
    >
      <Parameter v-if="typeof fragment === 'object'" :fragment="fragment" />
    </div>
  </div>
</template>

<script>
import Sentence from "./Sentence.vue";
import Parameter from "./Parameter.vue";
import { mapActions } from "vuex";

export default {
  props: ["fragments"],
  components: { Parameter, Sentence },
  methods: {
    ...mapActions(["onInitializeParameters"]),
  },
};
</script>
