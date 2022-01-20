<template>
  <div class="top">
    <el-button class="goBack" @click="goBack">Go back</el-button>
    <h5>Results</h5>
  </div>
  <div
    id="toCopy"
    class="card"
    v-for="item in applyPatternsResponse"
    :key="item"
  >
    <el-scrollbar height="300px">
      <el-button
        v-if="item.Results.length > 0"
        size="small"
        class="copyButton"
        @click="copy"
        type="primary"
        plain
        >Copy Result</el-button
      >
      <p class="p">Result for Finalized Pattern " {{ item.Pattern }} " :</p>
      <p class="p">{{item.Description}}</p>
      <!-- <p class="p">Result :</p> -->
      <p class="p" id="result" v-if="item.Results.length > 0">
        {{ item.Results }}
      </p>
      <p class="pErrors" v-if="item.Results.length == 0">No Results found</p>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  computed: mapState({
    applyPatternsResponse: (state) => {
      return state.applyPatternsResponse;
    },
  }),

  methods: {
    ...mapActions(["onResetApplyPatternsResponse"]),
    goBack() {
      this.$router.back();
      this.onResetApplyPatternsResponse();
    },
    copy() {
       var text = document.getElementById("toCopy").innerText;
       console.log(text)
       navigator.clipboard.writeText(text)
    .then(() => {
        console.log('Text copied to clipboard');
    })
    .catch(err => {
        console.error('Error in copying text: ', err);
    });
    },
  },
};
</script>

<style scoped>
.card {
  width: 90%;
  min-height: 10rem;
  margin-bottom: 1%;
}
.p {
  text-align: left;
  margin-top: 2%;
  margin-left: 2%;
}
.top {
  display: flex;
}
.goBack {
  margin-right: 34%;
  margin-left: 5%;
  margin-bottom: 1%;
}
.pErrors {
  text-align: left;
  margin-top: 0%;
  margin-left: 2%;
  opacity: 0.5;
}
.copyButton {
  margin-bottom: 0%;
  margin-top: 1%;
  margin-left: 85%;
}
.header {
  display: flexbox;
}
</style>
