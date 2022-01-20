<template>
  <div>
    <p
      v-if="
        finalizedPatternsOfDatabase && finalizedPatternsOfDatabase.length > 0
      "
      class="info"
    >
      Select Finalized Patterns in order to test the selected Database
    </p>
    <el-table
      v-if="
        finalizedPatternsOfDatabase && finalizedPatternsOfDatabase.length > 0
      "
      class="card"
      ref="multipleTable"
      :data="finalizedPatternsOfDatabase"
      @selection-change="handleSelectionChange"
      height="20rem"
    >
      <el-table-column type="selection" />
      <el-table-column label="Name" width="200%">
        <template #default="scope">{{ scope.row.Name }}</template>
      </el-table-column>
      <el-table-column property="Description" label="Description" />
    </el-table>
    <!-- <p v-for="item in multipleSelection" :key="item">
      Selected Patterns {{ item.Name }}
    </p> -->
  </div>
  <div
    v-if="
      finalizedPatternsOfDatabase && finalizedPatternsOfDatabase.length == 0
    "
  >
    <p>No Finalized Patterns available for the selected Database.</p>
  </div>
  <div
    v-if="finalizedPatternsOfDatabase && finalizedPatternsOfDatabase.length > 0"
    class="testButton"
  >
    <el-button @click="applyPatterns">Apply Patterns to Database</el-button>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      multipleSelection: [],
    };
  },
  computed: mapState({
    finalizedPatterns: (state) => {
      return state.finalizedPatterns;
    },
    errorMessage: (state) => {
      return state.errorMessage;
    },
    successMessage: (state) => {
      return state.successMessage;
    },
    finalizedPatternsOfDatabase: (state) => {
      return state.finalizedPatternsOfDatabase;
    },
    applyPatternsResponse: (state) => {
      return state.applyPatternsResponse;
    },
  }),
  methods: {
    ...mapActions(["callFinalizedPatterns", "onApplyPatterns"]),
    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    async applyPatterns() {
      await this.onApplyPatterns(this.multipleSelection);
      if (this.applyPatternsResponse && this.applyPatternsResponse.length > 0) {
        this.$router.push(`/results`);
      }
    },
  },
  created() {
    this.callFinalizedPatterns();
  },
};
</script>

<style scoped>
.el-table {
  margin: auto;
  width: 95%;
}
.card {
  margin-top: 3%;
  margin-bottom: 3%;
}
.el-table {
  cursor: pointer;
  margin-left: 5%;
  margin-right: 5%;
  width: 90%;
}
.testButton {
  margin-bottom: 6%;
}
.info {
  text-align: left;
  margin-left: 5.5%;
  opacity: 0.5;
}
</style>
