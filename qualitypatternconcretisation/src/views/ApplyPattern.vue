<template>
      <DatabaseContainer/>
</template>

<script>
    import DatabaseContainer from "../components/containers/DatabaseContainer.vue"
    export default{
        name: "ApplyPattern",
        components:{DatabaseContainer},
    }
</script>

<style scoped>
    .databaseContainer{
        margin: auto;
        width:80%;
    }
</style>