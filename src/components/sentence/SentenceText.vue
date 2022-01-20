<template>
  <div v-if="fragments && fragments.length > 0">
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
          :title="
            `${
              parameterExplanations
                ? parameterExplanations.find((parameterExplanation) => {
                    return parameterExplanation.Parameter === fragment.Role;
                  })?.Explanation || fragment.Type
                : 'Click to edit'
            }`
          "
          @click="() => selectActiveParameter(fragment)"
          :type="
            `${
              fragment &&
              fragment.concretized &&
              (fragment.Value.length > 0 ||
                typeof fragment.Value === 'number' ||
                typeof fragment.Value === 'boolean')
                ? 'success'
                : fragment.Value !== undefined &&
                  fragment.Value !== null &&
                  (fragment.Value.length > 0 ||
                    typeof fragment.Value === 'number' ||
                    typeof fragment.Value === 'boolean')
                ? 'info'
                : 'danger'
            }`
          "
          :class="
            ` object-parameter ${
              fragment &&
              fragment.concretized &&
              (fragment.Value.length > 0 ||
                typeof fragment.Value === 'number' ||
                typeof fragment.Value === 'boolean')
                ? 'object-parameter-success'
                : fragment.Value !== undefined &&
                  fragment.Value !== null &&
                  (fragment.Value.length > 0 ||
                    typeof fragment.Value === 'number' ||
                    typeof fragment.Value === 'boolean')
                ? 'object-parameter-default'
                : 'object-parameter-empty'
            }`
          "
          v-if="
            typeof fragment === 'object' &&
              (!fragment.Dependent ||
                (fragment.Dependent &&
                  fragments.find((f) => {
                    return (
                      f.Enable &&
                      fragment.URLs.includes(f.Enable.Parameter) &&
                      f.Enable.If === f.Value
                    );
                  })))
          "
          effect="plain"
        >
          {{
            fragment &&
            fragment.Value !== undefined &&
            fragment.Value !== null &&
            (fragment.Value.length > 0 ||
              typeof fragment.Value === "number" ||
              typeof fragment.Value === "boolean")
              ? `${fragment.Value} `
              : `${fragment.Name} `
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
    parameterExplanations: (state) => {
      return state.parameterExplanations;
    },
  }),
  methods: {
    ...mapActions(["selectActiveParameter"]),
  },
  created() {
    console.log(this.fragments);
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

.object-parameter-success:hover {
  background: #9dcc5a;
  color: #ffffff !important;
}

.object-parameter-empty:hover {
  background: #fd0a01;
  color: #ffffff !important;
}
</style>
