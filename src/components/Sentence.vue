<template>
  <div
    v-if="
      concretePatternParameters &&
        Object.keys(concretePatternParameters).length > 0
    "
  >
    <p>
      <span
        v-for="(fragment, index) in fragments"
        :key="index"
        class="py-1 px-0 d-inline-block"
      >
        <span v-if="typeof fragment === 'string'">
          {{ fragment }}
        </span>
        <el-tag
          class="mx-2"
          :style="{
            cursor: 'pointer',
          }"
          data-toggle="tooltip"
          data-placement="bottom"
          title="Click to edit"
          @click="() => selectActiveParameter(fragment.URL)"
          :type="
            `${
              concretePatternParameters[fragment.URL] &&
              concretePatternParameters[fragment.URL].value &&
              concretePatternParameters[fragment.URL].value.length > 0
                ? 'info'
                : 'warning'
            }`
          "
          :class="
            ` object-parameter ${
              concretePatternParameters[fragment.URL] &&
              concretePatternParameters[fragment.URL].value &&
              concretePatternParameters[fragment.URL].value.length > 0
                ? 'object-parameter-default'
                : 'object-parameter-empty'
            }`
          "
          effect="plain"
          v-if="
            typeof fragment === 'object' &&
              concretePatternParameters[fragment.URL] &&
              concretePatternParameters[fragment.URL].visible
          "
        >
          {{
            concretePatternParameters[fragment.URL] &&
            concretePatternParameters[fragment.URL].value &&
            concretePatternParameters[fragment.URL].value.length > 0
              ? `${concretePatternParameters[fragment.URL].value} `
              : (placeholder = "Empty value")
          }}
        </el-tag>
      </span>
    </p>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  props: ["fragments"],
  computed: mapState({
    concretePatternParameters: (state) => {
      return state.concretePatternParameters;
    },
  }),
  methods: {
    ...mapActions(["selectActiveParameter"]),
  },
};
</script>

<style scoped>
.object-parameter {
  transition: all 100ms ease-in-out;
}

.object-parameter-default:hover {
  background: darkgray;
  color: #ffffff !important;
}

.object-parameter-empty:hover {
  background: #ffa900;
  color: #ffffff !important;
}
</style>
