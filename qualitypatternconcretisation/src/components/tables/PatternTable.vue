<template>
    <div class="card">
        <el-table v-if="Patterns && Patterns.length > 0" :data="getFilteredPatterns()" align="center" width="100%" size="medium">
            <el-table-column label="Name" prop="Name" class="columnName"/>
            <el-table-column width="150%" label="Status" prop="Status"/> 
            <el-table-column width="550%" label="Description" prop="Description" class="columnName1"/>
            <el-table-column width="180%" align="right">
                <template #header>
                    <el-input v-model="search" size="mini" placeholder="Filter by name" v-if="currentPage === 1" />
                </template>
                <template #default="scope">
                    <el-button size="mini" icon="el-icon-edit" type="primary" circle plain @click=" () => {
                        navigateTo(`/Patterns/edit/${scope.row.Name}`);
                    }" title="Click to edit"/>
                    <el-button size="mini" type="danger" icon="el-icon-delete" circle plain title="Click to delete" @click=" () => {
                        getPatternName(scope.row);
                        open();
                    }"/>
                </template>
            </el-table-column>
        </el-table>
    </div>
    <div class="block my-4" v-if="Patterns && Patterns.length > 0">
        <el-pagination layout="prev, pager, next" :total="Patterns.length" v-on:current-change="onPageChange"/>
    </div>
</template>

<script>
    import { mapState, mapActions } from "vuex";

    export default {
        data: () => {
            return {
                loading: false,
                userPatternChoice: "",
                search: "",
                currentPage: 1,
                tableData: [],
            };
        },
        computed: mapState({
            Patterns: (state) => {
                return state.Patterns;
            },
            userPatternName: (state) => {
                return state.userPatternName;
            },
            PatternTextObject: (state) => {
                return state.PatternTextObject;
            },
        }),
        methods: {
            ...mapActions(["callPatterns", "onDelete"]),
            onPageChange(pageNumber) {
                this.currentPage = pageNumber;
            },
            filterElements(Pattern) {
                if (this.search && this.search.length === 0) {
                    return true;
                }

                if (!this.search) {
                    return true;
                }

                if (Pattern && Pattern.Name) {
                    return Pattern.Name.toLowerCase().includes(
                        this.search.toLowerCase()
                    );
                } else {
                    return false;
                }
            },
            getFilteredPatterns() {
                const filteredPatterns = this.Patterns
                    .filter((Pattern) => {
                        return (
                            typeof Pattern === "object" &&
                            Pattern.hasOwnProperty("Name")
                        );
                    })
                    .filter(this.filterElements)
                    .slice(10 * this.currentPage - 10, 10 * this.currentPage)
                    .filter((Pattern) => {
                        return Pattern && Pattern.Name;
                    });

                return filteredPatterns;
            },
            navigateTo(url) {
                this.$router.push(url);
            },
            open() {
                this.$confirm(
                    `This will permanently delete the  pattern with name < ${this.userPatternChoice} > .
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
            getPatternName(row) {
                this.userPatternChoice = row.Name;
            },
            async handleDelete() {
                await this.onDelete(this.userPatternChoice);
                this.callPatterns();
            },
        },
        created() {
            this.callPatterns();
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
