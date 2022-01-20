<template>
  
  <div class="abstract-pattern-step-container">
    <p class="description">Click on any abstract pattern in order to select it and view his texts.</p>
    <el-scrollbar height="400px">
      <div
        class="card abstract-pattern-card"
        v-for="abstractPattern in abstractPatterns"
        :key="abstractPattern"
        :style="{
          borderColor:
            userAbstractPattern === abstractPattern.Name
              ? 'rgb(51, 204, 255)'
              : '',
        }"
        @click="() => selectAbstractPattern(abstractPattern)"
      >
        <p class="card-title">
          {{ abstractPattern.Name }}
        </p>
        <div class="card-body">
          <small>
            {{ abstractPattern.Description }}
          </small>
          <!-- <p>{{abstractPattern.ExampleText.Fragments}}</p> -->
        </div>
         <div class="card-body">
        <ReadonlySentence :fragments="abstractPattern.ExampleText.Fragments" />
      </div>
      </div>
    </el-scrollbar>
    <div
      v-if="!userAbstractPattern && nextStepClicked"
    >
     <el-alert class="alert" title="Please select an abstract pattern" type="error" show-icon> </el-alert>
    </div>
   

  </div>
</template>

<script>
import ReadonlySentence from "../sentence/ReadonlySentence.vue"
import { mapActions, mapState } from "vuex";

export default {
  props: ["nextStepClicked"],
  components: {ReadonlySentence},
  data() {
    return {
      selectedAbstractPattern: "",
    };
  },
  methods: {
    ...mapActions(["callAbstractPatterns", "onUserAbstractPatternChoice"]),
    selectAbstractPattern(abstractPattern) {
      this.selectedAbstractPattern = abstractPattern.Name;
      this.onUserAbstractPatternChoice(abstractPattern.Name);
    },
  },
  computed: mapState({
    abstractPatterns: (state) => {
      return state.abstractPatterns;
    },
    userAbstractPattern: (state) => {
      return state.userAbstractPattern;
    },
  }),
  created() {
    this.callAbstractPatterns();
  },
  updated(){
    console.log(this.abstractPatterns)
  }
 
};
</script>

<style scoped>
.abstract-pattern-step-container {
  padding: 1rem;
}

.abstract-pattern-step-title {
  padding: 1rem;
  opacity: 0.6;
}

.abstract-pattern-card {
  width: 80%;
  border-radius: 2px;
  margin: auto;
  text-align: left;
  padding: 0.5rem;
  cursor: pointer;
  margin-bottom: 1rem;
}
.abstract-pattern-card p {
  opacity: 0.6;
}
.alert{
    width:80%;
    margin: auto;
}
.description{
  opacity: 0.5;
}
</style>
