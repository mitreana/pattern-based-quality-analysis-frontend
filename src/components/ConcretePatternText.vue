<template>
  <table
    class="table w-50 mx-auto table-bordered"
    v-if="
      concretePatternTextObject &&
        Object.keys(concretePatternTextObject).length > 0
    "
  >
    <tbody>
      <tr>
        <th>Pattern Name:</th>
        <td>{{ concretePatternTextObject.PatternName }}</td>
      </tr>
      <tr>
        <th>Pattern Text Name:</th>
        <td>{{ concretePatternTextObject.PatternTextName }}</td>
      </tr>
    </tbody>
  </table>
  <ConcretePattern
    v-if="
      concretePatternTextObject &&
        concretePatternTextObject.Fragments &&
        concretePatternTextObject.Fragments.length > 0
    "
    :fragments="concretePatternTextObject.Fragments"
  />
</template>

<script>
import ConcretePattern from "../components/ConcretePattern.vue";
import { mapState, mapActions } from "vuex";

export default {
  name: "ConcretePatternText",
  components: { ConcretePattern },
  computed: mapState({
    userConcretePatternName: (state) => {
      return state.userConcretePatternName;
    },
    concretePatternTextObject: (state) => {
      return state.concretePatternTextObject;
    },
  }),
  methods: {
    ...mapActions(["callConcretePatternText"]),
  },
  created() {
    console.log(this.concretePatternTextObject);
  },
};
</script>
