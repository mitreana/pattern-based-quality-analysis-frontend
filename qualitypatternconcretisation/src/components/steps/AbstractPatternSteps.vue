<template>
    <div class="steps">
        <el-steps :active="active" finish-status="success" align-center simple>
            <el-step
                     title="Abstract Pattern"
                     description="Click on any abstract pattern in order to select it and view his texts"
                     >

            </el-step>
            <el-step
                     title="Abstract Pattern Text"
                     description="Click on any abstract pattern text in order to select it"
                     >

            </el-step>
            <el-step
                     title="Concrete Pattern Name"
                     description="Enter an appropriate concrete pattern name"
                     >

            </el-step>
        </el-steps>
    </div>
    <el-form>
        <div class="step-container">
            <AbstractPatternStep
                                 v-if="this.active === 0"
                                 :nextStepClicked="nextStepClicked"
                                 />
            <AbstractPatternTextStep
                                     :nextStepClicked="nextStepClicked"
                                     v-if="this.active === 1"
                                     />
            <ConcretePatternNameStep
                                     v-if="this.active === 2"
                                     :createButtonClicked="createButtonClicked"
                                     />
        </div>
        <el-button-group class="control-button-group">
            <el-button class="placeholder-button" v-if="this.active === 0"
                       >A button</el-button
      >
            <el-button
                       @click="back"
                       v-if="this.active !== 0"
                       class="back-button mx-2"
                       >
            <el-icon class="el-icon--right"><ArrowLeft /></el-icon>
            Go Back</el-button
      >
            <el-button @click="next" v-if="this.active !== 2" class="next-button"
                       >Next step <el-icon class="el-icon--right"><ArrowRight /></el-icon
      ></el-button>
            <el-button @click="create" v-if="this.active === 2" class="create-button"
                       >Create <el-icon class="el-icon--right"><Plus /></el-icon
      ></el-button>
        </el-button-group>
    </el-form>
</template>

<script>

    import AbstractPatternStep from "./AbstractPatternStep.vue";
    import AbstractPatternTextStep from "./AbstractPatternTextStep.vue";
    import ConcretePatternNameStep from "./ConcretePatternNameStep.vue";
    import { ArrowLeft, ArrowRight, Plus, Edit } from "@element-plus/icons";
    import { mapState, mapActions } from "vuex";

    export default {
        components: {
            AbstractPatternStep,
            AbstractPatternTextStep,
            ConcretePatternNameStep,
            ArrowLeft,
            ArrowRight,
            Plus,
            Edit,
        },
        data() {
            return {
                active: 0,
                nextStepClicked: false,
                createButtonClicked: false,
            };
        },
        computed: mapState({
            userAbstractPattern: (state) => {
                return state.userAbstractPattern;
            },
            userAbstractPatternText: (state) => {
                return state.userAbstractPatternText;
            },
            userConcretePatternName: (state) => {
                return state.userConcretePatternName;
            },
            errorMessage: (state) => {
                return state.errorMessage;
            },
            successMessage: (state) => {
                return state.successMessage;
            },
        }),
        methods: {
            ...mapActions(["onCreateConcretePattern", "clearMessages"]),
            next() {
                let navigated = false;
                this.nextStepClicked = true;
                if (this.active === 0 && this.userAbstractPattern && !navigated) {
                    navigated = true;
                    this.nextStepClicked = false;
                    this.active += 1;
                }

                if (this.active === 1 && this.userAbstractPatternText && !navigated) {
                    navigated = true;
                    this.nextStepClicked = false;
                    this.active += 1;
                }
            },
            back() {
                if (this.active > 0) {
                    this.active -= 1;
                }
            },
            openNotification(title, message, type) {
                this.$notify({
                    title,
                    message,
                    type,
                    position: "bottom-right",
                });
            },

            getCorrectErrorMessage() {
                if (this.errorMessage.includes("409")) {
                    this.openNotification(
                        "Error Message",
                        "Please give another name that does not exist already!",
                        "error"
                    );
                }
                if (this.errorMessage.includes("500")) {
                    this.openNotification(
                        "Error Message",
                        "Saving concrete pattern failed! Please try again",
                        "error"
                    );
                }
            },
            async onSubmit() {
                await this.onCreateConcretePattern({
                    abstractPattern: this.userAbstractPattern,
                    abstractPatternText: this.userAbstractPatternText,
                    concretePatternName: this.userConcretePatternName,
                });
            },
            async create() {
                this.createButtonClicked = true;
                if (
                    !this.userConcretePatternName.includes(" ") &&
                    this.userConcretePatternName.length > 0
                ) {
                    await this.onSubmit();
                    if (this.successMessage.length > 0) {
                        this.openNotification(
                            "Redirecting to newly created Pattern...",
                            "< " + this.userConcretePatternName + " >",
                            "success"
                        );
                        this.callConcretePatterns;
                        this.onTimeout();
                    }
                }
                if (this.userConcretePatternName.includes(" ")) {
                    this.openNotification(
                        "Error Message",
                        "Please give a name that does not include empty spaces!",
                        "error"
                    );
                }
                if (this.errorMessage.length > 0) {
                    this.getCorrectErrorMessage();
                }
                this.clearMessages();
            },
            onTimeout() {
                setTimeout(() => {
                    this.$router.push(
                        `/concretePatterns/edit/${this.userConcretePatternName}`
                    );
                }, 6000);
            },
        },
    };
</script>

<style scoped>
    .el-button {
        margin-bottom: 4.5%;
        margin-top: 0%;
    }

    .control-button-group {
        display: flex;
        width: 75%;
        margin: auto;
        flex-direction: row;
    }

    .control-button-group .next-button {
        width: 50%;
        justify-self: end;
    }

    .control-button-group .back-button {
        width: 50%;
    }

    .control-button-group .create-button {
        width: 50%;
    }

    .control-button-group .placeholder-button {
        visibility: hidden;
        width: 50%;
    }
    .el-step__title {
        width: 60%;
    }
    .steps {
        width: 100%;
        height: 50%;
    }
</style>