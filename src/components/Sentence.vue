<template>
<div>
  <p
    v-if="
      concretePatternParameters &&
        Object.keys(concretePatternParameters).length > 0  
    "
    :style="{ whiteSpace: 'pre-line' }"
    v-on:click="onClick"
   
  >
    <span
       v-for="fragment in fragments"
      :key="fragment"
      :style="{
        fontWeight: typeof fragment !== 'string' && 'bold',
        border: typeof fragment !== 'string' && '1px solid #333',
        borderRadius: '2px',
        padding: typeof fragment !== 'string' && '2px',
        margin: typeof fragment !== 'string' && '4px',
        lineHeight: '2rem',
        color: typeof fragment !== 'string' ? colors.progress
              : '#333',
        cursor: typeof fragment !== 'string' && 'pointer',
      }"
      @click="onClick "
    >
      {{
        typeof fragment === "string"
          ? fragment   
          : concretePatternParameters[fragment.URL].value &&
            concretePatternParameters[fragment.URL].value.length > 0
          ? ` ${concretePatternParameters[fragment.URL].id}: ${
              concretePatternParameters[fragment.URL].value
            } `
          : ` ${concretePatternParameters[fragment.URL].id}: Empty value `
      }}
      
    </span>
  </p>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  props: ["fragments"],
  computed: mapState({
    concretePatternParameters: (state) => {
      return state.concretePatternParameters;
    },
  }),
  data: () => {
    return {
      colors: {
        progress: "#DAB923",
        done: "#63D34C",
      },
    };
  },
  methods:{
    onclick(){
      
        console.log("hello")
     
    }
  }
};
</script>

