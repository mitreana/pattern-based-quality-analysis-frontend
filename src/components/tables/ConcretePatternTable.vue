<template>
  <el-table
    v-if="concretePatterns && concretePatterns.length > 0 && concretePatterns.Name && concretePatterns.Name > 0"
    :data="getFilteredPatterns()"
    style="width: 100%"
  >
    <el-table-column label="Pattern Name" prop="PatternName"> </el-table-column>
    <el-table-column label="Pattern Text Name" prop="PatternTextName">
    </el-table-column>
    <el-table-column align="right">
      <template #header>
        <el-input
          v-model="search"
          size="mini"
          placeholder="Filter by pattern name"
          v-if="currentPage === 1"
        />
      </template>
      <template #default="scope">
        <el-button
          size="mini"
          icon="el-icon-edit"
          type="primary"
          circle
          plain
          @click="
            () => {
              navigateTo(`/concretePatterns/edit/${scope.row.PatternName}`);
            }
          "
          title="Click to edit"
        >
        </el-button>

        <el-button
          size="mini"
          type="danger"
          icon="el-icon-delete"
          circle
          plain
          title="Click to delete"
          @click="
            () => {
              getConcretePatternName(scope.row);
              open();
            }
          "
        ></el-button>
      </template>
    </el-table-column>
  </el-table>
  <div
    class="block my-4"
    v-if="concretePatterns && concretePatterns.length > 0"
  >
    <el-pagination
      layout="prev, pager, next"
      :total="concretePatterns.length"
      v-on:current-change="onPageChange"
    >
    </el-pagination>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  data: () => {
    return {
      userConcretePatternChoice: "",
      search: "",
      currentPage: 1,
    };
  },
  computed: mapState({
    concretePatterns: (state) => {
      return state.concretePatterns;
    },
    userConcretePatternName: (state) => {
      return state.userConcretePatternName;
    },
    concretePatternTextObject: (state) => {
      return state.concretePatternTextObject;
    },
  }),
  methods: {
    ...mapActions(["callConcretePatterns", "onDelete"]),
    onPageChange(pageNumber) {
      this.currentPage = pageNumber;
    },
    filterElements(concretePattern) {
      if (this.search && this.search.length === 0) {
        return true;
      }

      if (!this.search) {
        return true;
      }

      if (concretePattern && concretePattern.PatternName) {
        return concretePattern.PatternName.toLowerCase().includes(
          this.search.toLowerCase()
        );
      } else {
        return false;
      }
    },
    getFilteredPatterns() {
      const filteredConcretePatterns = this.concretePatterns
        .filter((concretePattern) => {
          return (
            typeof concretePattern === "object" &&
            concretePattern.hasOwnProperty("PatternName")
          );
        })
        .filter(this.filterElements)
        .slice(10 * this.currentPage - 10, 10 * this.currentPage)
        .filter((concretePattern) => {
          return concretePattern && concretePattern.PatternName;
        });

      return filteredConcretePatterns;
    },
    navigateTo(url) {
      this.$router.push(url);
    },
    open() {
      this.$confirm(
        `This will permanently delete the concrete pattern with name < ${this.userConcretePatternChoice} > .
           Continue?`,
        "Warning",
        {
          confirmButtonText: "OK",
          cancelButtonText: "Cancel",
          type: "warning",
        }
      )
        .then(() => {
          this.$message(
            {
              type: "success",
              message: "Delete completed",
            },
            this.handleDelete()
          );
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "Delete canceled",
          });
        });
    },
    getConcretePatternName(row) {
      this.userConcretePatternChoice = row.PatternName;
    },
    async handleDelete() {
      await this.onDelete(this.userConcretePatternChoice);

      this.callConcretePatterns();
      //location.reload();
    },
  },
  created() {
    this.callConcretePatterns();
  },
};
</script>

<style></style>
