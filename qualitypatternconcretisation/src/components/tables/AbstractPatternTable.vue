<template>
    <div class="card">
        <el-table
                  v-if="abstractPatterns && abstractPatterns.length > 0"
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
                    <el-button size="mini" icon="el-icon-edit" type="primary" circle plain @click=" () => {
                               navigateTo(`/abstractPatterns/edit/${scope.row.Name}`);
                    } " title="Click to edit"/>
                    <el-button size="mini" type="danger" icon="el-icon-delete" circle plain title="Click to delete" @click=" () => { 
                        getabstractPatternName(scope.row);
                        open();
                    }"/>
                </template>
            </el-table-column>
        </el-table>
    </div>
    <div class="block my-4" v-if="abstractPatterns && abstractPatterns.length > 0">
        <el-pagination layout="prev, pager, next" :total="abstractPatterns.length" v-on:current-change="onPageChange"/>
    </div>
</template>

<script>
    import { mapState, mapActions } from "vuex";

    export default {
        data: () => {
            return {
                loading: false,
                userabstractPatternChoice: "",
                search: "",
                currentPage: 1,
                tableData: [],
            };
        },
        computed: mapState({
            abstractPatterns: (state) => {
                return state.abstractPatterns;
            },
            userabstractPatternName: (state) => {
                return state.userabstractPatternName;
            },
            abstractPatternTextObject: (state) => {
                return state.abstractPatternTextObject;
            },
        }),
        methods: {
            ...mapActions(["callAbstractPatterns", "onDelete"]),
            onPageChange(pageNumber) {
                this.currentPage = pageNumber;
            },
            filterElements(abstractPattern) {
                if (this.search && this.search.length === 0) {
                    return true;
                }

                if (!this.search) {
                    return true;
                }

                if (abstractPattern && abstractPattern.Name) {
                    return abstractPattern.Name.toLowerCase().includes(
                        this.search.toLowerCase()
                    );
                } else {
                    return false;
                }
            },
            getFilteredPatterns() {
                const filteredabstractPatterns = this.abstractPatterns
                    .filter((abstractPattern) => {
                        return (
                            typeof abstractPattern === "object" &&
                            abstractPattern.hasOwnProperty("Name")
                        );
                    })
                    .filter(this.filterElements)
                    .slice(10 * this.currentPage - 10, 10 * this.currentPage)
                    .filter((abstractPattern) => {
                        return abstractPattern && abstractPattern.Name;
                    });

                return filteredabstractPatterns;
            },
            navigateTo(url) {
                this.$router.push(url);
            },
            open() {
                this.$confirm(
                    `This will permanently delete the abstract pattern with name < ${this.userabstractPatternChoice} > .
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
            getabstractPatternName(row) {
                this.userabstractPatternChoice = row.Name;
            },
            async handleDelete() {
                await this.onDelete(this.userabstractPatternChoice);
                this.callAbstractPatterns();
            },
        },
        created() {
            this.callAbstractPatterns();
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
