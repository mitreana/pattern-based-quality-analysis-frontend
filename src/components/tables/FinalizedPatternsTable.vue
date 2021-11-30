<template>
<div class="card">
  <el-table
    ref="multipleTable"
    :data="finalizedPatterns"
    @selection-change="handleSelectionChange"
    height="20rem"
  >
    <el-table-column type="selection" />
    <el-table-column label="Name" width="200%">
      <template #default="scope">{{ scope.row.Name }}</template>
    </el-table-column>
    <el-table-column  property="Description" label="Description" />
  </el-table>
  <p v-for="item in multipleSelection" :key="item">Selected Patterns {{item.Name}}</p>
  </div>

</template>

<script>
import {mapState,mapActions} from 'vuex'

export default {
  data() {
    return {
      multipleSelection: [],
    }
  },computed: mapState({
      finalizedPatterns: (state) => {
         return state.finalizedPatterns;
      },
       errorMessage: (state) => {
      return state.errorMessage;
    },
    successMessage: (state) => {
      return state.successMessage;
    },
  })
,
  methods: {
    ...mapActions(["callFinalizedPatterns"]),
    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
      
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
      console.log(this.multipleSelection)
    },
  },
  created(){
      this.callFinalizedPatterns()
  },
}
</script>

<style scoped>
.el-table{
    margin: auto;
    width: 95%;
  
}
.card{
  margin-top: 3%;
    margin-bottom: 3%;
}
</style>