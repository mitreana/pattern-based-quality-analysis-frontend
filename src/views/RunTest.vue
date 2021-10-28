<template>
    <div class="testDatabaseForm card">
    <div class="card-body">
      <h3 ref="title" class="card-title">Test a database</h3>
      <TestDatabaseForm></TestDatabaseForm>
    </div>
  </div>
</template>

<script>
import TestDatabaseForm from "../components/forms/TestDatabaseForm.vue"
export default{
   name: "RunTest",
   components:{TestDatabaseForm},

}
</script>

<style scoped>
.testDatabaseForm{
    margin: auto;
    width:80%
    
}
</style>