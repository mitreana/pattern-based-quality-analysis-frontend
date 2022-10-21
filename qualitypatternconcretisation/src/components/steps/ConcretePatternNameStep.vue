<template>
    <p class="description-input">Enter an appropriate concrete pattern name.</p>
    <div class="info">
        <p>Abstract pattern : {{ this.userAbstractPattern }}</p>
        <p>Abstract pattern text : {{ this.userAbstractPatternText }}</p>
    </div>

  <div class="concrete-pattern-name-input">
      <p class="concrete-pattern-name-title">Concrete Pattern Name :</p>
      <el-form-item
                    :error="
                    userConcretePatternName.length === 0 && createButtonClicked
                    ? 'Please enter a concrete pattern name'
                    : ''
                    "
                    >
          <el-input
                    placeholder="Enter a name for the concrete pattern that does not exist already"
                    v-model="selectedConcretePatternName"
                    @input="selectConcretePatternName"
                    ></el-input>
      </el-form-item>
  </div>
</template>

<script>
    import { mapState, mapActions } from "vuex";

    export default {
        props: ["createButtonClicked"],
        data() {
            return { selectedConcretePatternName: "" };
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
        }),
        methods: {
            ...mapActions([
                "onCreateConcretePattern",
                "onUserConcretePatternNameChoice",
            ]),
            selectConcretePatternName(value) {
                this.selectedConcretePatternName = value;
                this.onUserConcretePatternNameChoice(value);
            },
        },
    };
</script>

<style scoped>
    .concrete-pattern-name-input {
        width: 80%;
        margin: auto;
        margin-top: 5%;
        margin-bottom: 12%;
    }
    .concrete-pattern-name-title {
        text-align: left;
        margin-bottom: 0%;

    }
    .abstract-pattern-info {
        width: 80%;
        margin: auto;
        margin-bottom: 0%;
        margin-top: 2%;
        text-align: left;
    }
    .abstract-pattern-text-info {
        width: 80%;
        margin: auto;
        margin-bottom: 1%;
        margin-top: 0%;
        text-align: left;
    }
    .input {
        margin: auto;
    }
    .description-input {
        opacity: 0.5;
        margin-top: 1rem;
    }
    .info {
        width: 80%;
        text-align: left;
        margin: auto;
        margin-top: 5%;
    }
</style>