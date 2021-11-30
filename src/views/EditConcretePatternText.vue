<template>
  <!-- <div
    :style="{
      margin: 'auto',
    }"
    v-if="
      concretePatternTextObject &&
        Object.keys(concretePatternTextObject).length > 0
    "
  >
    <RegisterDatabaseForm
      v-if="registerDatabaseComponent === true"
    ></RegisterDatabaseForm>
    <DatabasesTable></DatabasesTable>
  </div> -->
  <div
    class="edit card"
    v-if="
      concretePatternTextObject &&
        Object.keys(concretePatternTextObject).length > 0
    "
  >
    <div class="card-body">
      <h5 ref="title" class="card-title">
        Edit concrete pattern "{{ concretePatternTextObject.PatternName }}"
      </h5>
      <el-form label-position="left">
        <div id="name">
            <el-collapse class="concrete-pattern-info">
              <el-collapse-item title="Pattern Details">
                <div>
                  <p>
                    Name : {{ concretePatternTextObject.PatternName }}
                  </p>
                  <p>
                    Text Name :
                    {{ concretePatternTextObject.PatternTextName }}
                  </p>
                </div>
              </el-collapse-item>
            </el-collapse>
             <el-form-item
            label="Pattern Description"
            class="d-flex flex-column text-justify"
            v-if="
              concretePatternTextObject.PatternName &&
                concretePatternTextObject.PatternName.length > 0
            "
          >
            <el-input type="textarea" class="w-100" v-model="concretePatternTextObject.PatternDescription" @change="updateDescription">
            </el-input>

          </el-form-item>
        </div>
        <div class="database">
        <el-form-item label="Select Database">
            <DatabaseSelect></DatabaseSelect>
        </el-form-item>
        <el-form-item>
        <el-link @click="registerDatabase">Or click here to register a database</el-link>
        </el-form-item>
        </div>
        <el-form-item label="Sentence" class="d-flex flex-column text-justify">
          <ConcretePatternSentenceContainer
            v-if="
              concretePatternTextObject &&
                concretePatternTextObject.Fragments &&
                concretePatternTextObject.Fragments.length > 0
            "
            :fragments="concretePatternTextObject.Fragments"
          />
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import ConcretePatternSentenceContainer from "../components/containers/ConcretePatternSentenceContainer.vue";
import RegisterDatabaseForm from "../components/forms/RegisterDatabaseForm.vue";
import DatabasesTable from "../components/tables/DatabasesTable.vue";
import DatabaseSelect from "../components/forms/DatabaseSelect.vue"
export default {
  data(){
    return {
       selectedDatabase:""
    };
  },
  components: {
    ConcretePatternSentenceContainer,
    RegisterDatabaseForm,
    DatabasesTable,
    DatabaseSelect
  },
  computed: mapState({
    concretePatternTextObject: (state) => {
      return state.concretePatternTextObject;
    },
    registerDatabaseComponent: (state) => {
      return state.registerDatabaseComponent;
    },
  }),
  methods: {
    ...mapActions(["callConcretePatternText",]),
    updateDescription(){
      
    },
    registerDatabase(){
       this.$router.push(
            `/runTest`
          );
    }
  },
  created() {
    
    const params = this.$route.params;
    if (
      params &&
      params.concretePatternName &&
      params.concretePatternName.length > 0
    ) {
      this.callConcretePatternText(params.concretePatternName);
    }
  }
};
</script>

<style scoped>
.el-tag {
  text-align: left;
  font-size: 1rem;
}
.edit {
  margin-top: 2rem;
  width: 80%;
  margin: auto;
}
             
.el-collapse-item{
  text-align: start;
}
.el-link{
  text-align: left;
  width: 100%;
  margin-left: 4%;
  margin: auto;
  
}
.database{
  display: flex;
  margin: auto;
  margin-top: 3%;
}
</style>
