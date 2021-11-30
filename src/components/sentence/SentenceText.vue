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
          title="Click to edit"
          @click="() => selectActiveParameter(fragment)"
          :type="`${fragment && fragment.Value ? 'info' : 'warning'}`"
          :class="
            ` object-parameter ${
              fragment && fragment.Value
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
            fragment && fragment.Value
              ? `${fragment.Value} `
              : `${fragment.ExampleValue} `
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
