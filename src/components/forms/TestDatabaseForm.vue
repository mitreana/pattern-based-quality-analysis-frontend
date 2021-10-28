<template>
  <el-form :model="form" ref="form" label-position="left">
    <div class="container my-4">
      <el-form-item
        label="Databases"
        required
        class="d-flex flex-column text-justify"
      >
        <el-select placeholder="Select a database" class="w-100">
          <!-- <el-option></el-option> -->
        </el-select>
      </el-form-item>
    </div>
    <div class="container my-4">
      <el-form-item
        label="Finalized Patterns"
        required
        class="d-flex flex-column text-justify"
      >
        <el-select placeholder="Select a finalized pattern" class="w-100">
          <!-- <el-option> </el-option> -->
        </el-select>
      </el-form-item>
    </div>
    <el-button type="primary" plain>Run Test</el-button>
    <div class="container my-4">
      <el-form-item class="d-flex flex-column text-justify">
        <div class="card" >
          <div class="card-body">
              <plaintext >RESULT</plaintext>
          </div>
        </div>
      </el-form-item>
    </div>
  </el-form>
</template>

<script>
export default {
  name: "TestDatabaseForm",
};
</script>

<style scoped>
plaintext{
    color: darkgray;
    margin-top: 7%;
    margin-bottom: 7%;
}
</style>