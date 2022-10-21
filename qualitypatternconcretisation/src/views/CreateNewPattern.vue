<template>
    <div class="createNewPattern">
        <div>
            <h3 ref="title">Create a new concrete pattern</h3>
            <!-- <AbstractPatternForm/> -->
            <AbstractPatternSteps/>
        </div>
    </div>
    <router-view/>
</template>

<script>
    import AbstractPatternForm from "../components/forms/AbstractPatternsForm.vue";
    import AbstractPatternSteps from "../components/steps/AbstractPatternSteps.vue";
    import Navbar from "../components/navigation/Navbar.vue";
    import { mapState, mapActions } from "vuex";

    export default {
        name: "CreateNewPattern",
        components: {
            AbstractPatternForm,
            AbstractPatternSteps,
            Navbar,
        },

        data: () => {
            return {
                timeout: false,
                form: {
                    "Abstract Pattern": "",
                    "Abstract Pattern Text": "",
                    "Concrete Pattern Name": "",
                },
                loading: false,
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
            activeConcretePattern: (state) => {
                return state.activeConcretePattern;
            },
        }),

        methods: {
            ...mapActions([
                "onCreateConcretePattern",
                "clearMessages",
                "resetUserConcretePatternInformation",
                "onActiveConcretePatternChoice",
            ]),
            onTimeout() {
                setTimeout(() => {
                    this.goToJustCreatedConcretePattern();
                    this.resetUserConcretePatternInformation();
                    this.clearMessages();
                }, 5000);
            },
            async onSubmit() {
                this.loading = true;
                await this.onCreateConcretePattern({
                    abstractPattern: this.userAbstractPattern,
                    abstractPatternText: this.userAbstractPatternText,
                    concretePatternName: this.userConcretePatternName,
                });
                this.loading = false;
                this.onTimeout();
            },
            submitForm(formName) {
                this.$refs[formName].validate(async (valid) => {
                    if (valid) {
                        await this.onSubmit();
                    } else {
                        return false;
                    }
                });
            },
            goToJustCreatedConcretePattern() {
                if (this.successMessage.length > 0) {
                    this.$router.push("/concretePatterns");
                }
            }, created() {
            }
        },
    };
</script>

<style>
    .createNewPattern {
        width: 100%;
        margin: auto;
    }
    .title {
        padding-left: 3%;
        margin-top: 0px;
    }
</style>