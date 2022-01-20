<template>
<div class="databases"
  >
    <RegisterDatabaseForm
      v-if="registerDatabaseComponent === true"
    ></RegisterDatabaseForm>
    <RegisterDatabaseForm
      v-if="databases && databases.length == 0"
    ></RegisterDatabaseForm>
    <!-- <DatabasesTable v-if="registerDatabaseComponent === false"></DatabasesTable> -->
    <DatabasesTable v-if="databases && databases.length > 0"></DatabasesTable>
  </div>
  
  <!-- <div class="card">
  <el-form :model="form" ref="form" label-position="left">
    <el-button type="primary" plain>Run Test</el-button>
    <div class="container my-4">
      <el-form-item class="d-flex flex-column text-justify">
        <div class="card" >
          <div class="card-body">
              <plaintext >RESULT</plaintext>
          </div>
        </div>
      </el-form-item>
    </div>
  </el-form>
  </div> -->
  
  <!-- <div v-if="finalizedPatternsOfDatabase && finalizedPatternsOfDatabase.length > 0"><FinalizedPatternsTable></FinalizedPatternsTable></div> -->

</template>


<script>
import DatabasesTable from "../tables/DatabasesTable.vue"
import RegisterDatabaseForm from "../forms/RegisterDatabaseForm.vue"
import FinalizedPatternsTable from "../tables/FinalizedPatternsTable.vue"
import { mapActions,mapState} from 'vuex'
export default {
  data:()=>{
    return{
      showFinalizedPatterns: false
    }
  },
  name: "TestDatabaseForm",
  components: {DatabasesTable, RegisterDatabaseForm, FinalizedPatternsTable,},
  computed: mapState({
    concretePatternTextObject: (state) => {
      return state.concretePatternTextObject;
    },
    registerDatabaseComponent: (state) => {
      return state.registerDatabaseComponent;
    },
     databases: (state) => {
      return state.databases;
    }
  }),methods:{
    openFinalizedPatternsTable(){
      this.showFinalizedPatterns = true
    },finalizedPatternsOfDatabase: (state) => {
      return state.finalizedPatternsOfDatabase;
  },  ...mapActions([
      "callDatabases",
    ]),
    created() {
    this.callDatabases();
  },
  }
};
</script>

<style scoped>
plaintext{
    color: darkgray;
    margin-top: 7%;
    margin-bottom: 7%;
}
.databases{
  margin:auto;
  width: 100%;
}
.showButton{
  margin-top: 2%;
}
</style>