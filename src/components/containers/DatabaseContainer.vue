<template>
  <div class="databases">
   
        <RegisterDatabaseForm
      v-if="
        registerDatabaseComponent === true ||
          (databases && databases.length == 0)
      "
    ></RegisterDatabaseForm>
    <!-- <DatabasesTable v-if="registerDatabaseComponent === false"></DatabasesTable> -->
    <DatabasesTable v-if="databases && databases.length > 0"></DatabasesTable>
  </div>
  <!-- <div v-if="finalizedPatternsOfDatabase && finalizedPatternsOfDatabase.length > 0"><FinalizedPatternsTable></FinalizedPatternsTable></div> -->
</template>

<script>
import DatabasesTable from "../tables/DatabasesTable.vue";
import RegisterDatabaseForm from "../forms/RegisterDatabaseForm.vue";
import FinalizedPatternsTable from "../tables/FinalizedPatternsTable.vue";
import { mapActions, mapState } from "vuex";
export default {
  data: () => {
    return {
      showFinalizedPatterns: false,
    };
  },
  name: "DatabaseContainer",
  components: { DatabasesTable, RegisterDatabaseForm, FinalizedPatternsTable },
  computed: mapState({
    concretePatternTextObject: (state) => {
      return state.concretePatternTextObject;
    },
    registerDatabaseComponent: (state) => {
      return state.registerDatabaseComponent;
    },
    databases: (state) => {
      return state.databases;
    },
  }),
  methods: {
    openFinalizedPatternsTable() {
      this.showFinalizedPatterns = true;
    },
    finalizedPatternsOfDatabase: (state) => {
      return state.finalizedPatternsOfDatabase;
    },
    ...mapActions(["callDatabases"]),
  },
  async created() {
    await this.callDatabases();
  },
};
</script>

<style scoped>
plaintext {
  color: darkgray;
  margin-top: 7%;
  margin-bottom: 7%;
}
.databases {
  margin: auto;
  width: 100%;
}
.showButton {
  margin-top: 2%;
}
</style>
