<template>
    <div class="card">
        <el-table
                  v-if="concretePatterns && concretePatterns.length > 0"
                  :data="getFilteredPatterns()"
                  align="center"
                  width="100%"
                  size="medium"
                  >
            <el-table-column width="230%" label="Name" prop="Name" class="columnName">

            </el-table-column>
            <el-table-column
                             width="150%"
                             label="Status"
                             prop="Status"
                             ></el-table-column>
            <el-table-column
                             width="550%"
                             label="Description"
                             prop="Description"
                             class="columnName1"
                             ></el-table-column>
            <el-table-column width="180%" align="right">
                <template #header>
                    <el-input
                              v-model="search"
                              size="mini"
                              placeholder="Filter by name"
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
                    navigateTo(`/concretePatterns/edit/${scope.row.Name}`);
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
    </div>
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
                loading: false,
                userConcretePatternChoice: "",
                search: "",
                currentPage: 1,
                tableData: [],
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

                if (concretePattern && concretePattern.Name) {
                    return concretePattern.Name.toLowerCase().includes(
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
                            concretePattern.hasOwnProperty("Name")
                        );
                    })
                    .filter(this.filterElements)
                    .slice(10 * this.currentPage - 10, 10 * this.currentPage)
                    .filter((concretePattern) => {
                        return concretePattern && concretePattern.Name;
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
                this.userConcretePatternChoice = row.Name;
            },
            async handleDelete() {
                await this.onDelete(this.userConcretePatternChoice);
                this.callConcretePatterns();
            },
        },
        created() {
            this.callConcretePatterns();
        },
    };
</script>

<style scoped>
    .card {
      width: 90%;
    }
    .description {
      white-space: nowrap;
    }
    .column-name {
      background: "red";
    }
    .el-pagination{
      display: flex;
      justify-content: center;
    }
</style>
