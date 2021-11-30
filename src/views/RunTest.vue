<template>
    
      <TestDatabaseForm></TestDatabaseForm>

  
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