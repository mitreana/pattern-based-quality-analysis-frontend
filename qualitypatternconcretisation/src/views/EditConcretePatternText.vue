<template>
    <el-button
               :style="{ display: 'none' }"
               v-loading.fullscreen.lock="loading"
               ></el-button>
    <div
         v-if="
         concretePatternTextObject &&
         Object.keys(concretePatternTextObject).length > 0 &&
    !loading
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
                                        :defaultDatabase="
                                        userDatabase[concretePatternTextObject.PatternName]
                                        "
                                        />
                    </el-form-item>
                    <el-form-item>
                        <el-link @click="registerDatabase"
                                 >Or click here to register a database</el-link
              >
                    </el-form-item>
                </div>
                <el-form-item
                              label="Sentence"            class=" labels"
                              required
                              />
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
                    />
                    </el-form-item>

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
    import { ref } from "vue";
    export default {
        data() {
            return {
                selectedDatabase: "",
                selectedDescription: "",
                loading: false,
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
            userDatabase: (state) => {
                return state.userDatabase;
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
            this.loading = true;
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
            this.loading = false;
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