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
    v-if="
      concretePatternTextObject &&
        Object.keys(concretePatternTextObject).length > 0
    "
  >

    <h3 ref="title" class="card-title">
      Edit concrete pattern "{{ concretePatternTextObject.PatternName }}"
    </h3>
    <div class=" edit card">
      <div class="card-body">
        <el-form label-position="left">
           <div class="database">
            <el-form-item class="labels" label="Database" required>
              <DatabaseSelect
                :defaultDatabase="userDatabaseDefault"
              ></DatabaseSelect>
            </el-form-item>
            <el-form-item>
              <el-link @click="registerDatabase"
                >Or click here to register a database</el-link
              >
            </el-form-item>
          </div>
          <el-form-item
            label="Sentence"
            class=" labels"
            required
          ></el-form-item>
          <div class="userHelp">
            <!-- <p class="userDetails">1.Rover at each parameter to see details about the type allowed.</p>
          <p class="userDetails">2.Click on each parameter to edit.</p> -->
            <p class="userDetails">
              Please enter a value for each input by clicking on it.
            </p>
          </div>
          <el-form-item class="d-flex flex-column text-justify">
            <ConcretePatternSentenceContainer
              v-if="
                concretePatternTextObject &&
                  concretePatternTextObject.Fragments &&
                  concretePatternTextObject.Fragments.length > 0
              "
              :fragments="concretePatternTextObject.Fragments"
              :sentenceDetails="concretePatternTextObject"
          /></el-form-item>
         

          <!-- <div id="name">
          <el-collapse class="concrete-pattern-info">
            <el-collapse-item title="Pattern Details">
              <div>
                <p>Name : {{ concretePatternTextObject.PatternName }}</p>
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
            <el-input
              type="textarea"
              class="w-100"
              v-model="concretePatternTextObject.PatternDescription"
              @input="updateDescription"
            
            >
            </el-input>
          </el-form-item>
        </div> -->
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import ConcretePatternSentenceContainer from "../components/containers/ConcretePatternSentenceContainer.vue";
import RegisterDatabaseForm from "../components/forms/RegisterDatabaseForm.vue";
import DatabasesTable from "../components/tables/DatabasesTable.vue";
import DatabaseSelect from "../components/forms/DatabaseSelect.vue";
export default {
  data() {
    return {
      selectedDatabase: "",
      selectedDescription: "",
    };
  },
  components: {
    ConcretePatternSentenceContainer,
    RegisterDatabaseForm,
    DatabasesTable,
    DatabaseSelect,
  },
  computed: mapState({
    concretePatternTextObject: (state) => {
      return typeof state.concretePatternTextObject === "string"
        ? JSON.parse(JSON.stringify(state.concretePatternTextObject))
        : state.concretePatternTextObject;
    },
    registerDatabaseComponent: (state) => {
      return state.registerDatabaseComponent;
    },
    userPatternDescription: (state) => {
      return state.userPatternDescription;
    },
    userDatabaseDefault: (state) => {
      return state.userDatabaseDefault;
    },
  }),
  methods: {
    ...mapActions([
      "callConcretePatternText",
      "toggleEmptyErrorMessage",
      "onSetPatternDescription",
      "callDatabaseOfPattern",
      "selectActiveParameter",
      "callDatabases",
    ]),
    updateDescription() {
      const params = this.$route.params;
      this.selectedDescription = this.concretePatternTextObject.PatternDescription;
      console.log("----------" + this.selectedDescription);
      this.onSetPatternDescription({
        concretePatternName: params.concretePatternName,
        description: this.selectedDescription,
      });
    },
    registerDatabase() {
      this.$router.push(`/databases/registerDatabase`);
    },
  },
  async created() {
    await this.callDatabases();
    const params = this.$route.params;
    if (
      params &&
      params.concretePatternName &&
      params.concretePatternName.length > 0
    ) {
      await this.callConcretePatternText(params.concretePatternName);
      await this.callDatabaseOfPattern(params.concretePatternName);
    }
    this.selectedDescription = this.concretePatternTextObject.PatternDescription;
  },
  unmounted() {
    this.toggleEmptyErrorMessage(false);
    this.selectActiveParameter(null);
  },
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

.el-collapse-item {
  text-align: start;
}
.el-link {
  text-align: left;
  width: 100%;
  margin-left: 4%;
  margin: auto;
}
.database {
  display: flex;
  margin: auto;
  margin-top: 3%;
}
.userDetails {
  opacity: 50%;
  margin: auto;
  margin-top: 0%;
  margin-bottom: 0%;
  padding: 0% 0% 0% 0%;
}
.labels {
  font-weight: bold;
  font-size: 150%;
}
.userHelp {
  margin-bottom: 2%;
  font-size: small;
}
</style>
