<template>
      <h3 ref="title" class="card-title my-4 mx-2">Abstract Patterns</h3>
      <AbstractPatternTable/>
</template>

<script>
    import { mapState, mapActions } from "vuex";
    import AbstractPatternTable from "../../components/tables/AbstractPatternTable.vue";

    export default {
        name: "AbstractPatterns",
        computed: mapState({
            activeAbstractPattern: (state) => state.activeAbstractPattern,
        }),
        methods: { ...mapActions(["callAbstractPatternText"]) },

        components: {
            AbstractPatternTable,
        },
        created() {
            if (this.activeAbstractPattern && this.activeAbstractPattern.length > 0) {
                this.callAbstractPatternText(this.activeAbstractPattern);
            }
        },
    };
</script>

<style>
    .card {
        width: 80%;
        margin: auto;
        padding-top: 0%;
    }
</style>
