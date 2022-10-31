<template>
    <h3 ref="title" class="card-title my-4 mx-2">Finalized Patterns</h3>
    <PatternTable />
</template>

<script>
    import { mapState, mapActions } from "vuex";
    import PatternTable from "../../components/tables/PatternTable.vue";

    export default {
        name: "Patterns",
        computed: mapState({
            activePattern: (state) => state.activePattern,
        }),
        methods: { ...mapActions(["callPatternText"]) },

        components: {
            PatternTable,
        },
        created() {
            if (this.activePattern && this.activePattern.length > 0) {
                this.callPatternText(this.activePattern);
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
