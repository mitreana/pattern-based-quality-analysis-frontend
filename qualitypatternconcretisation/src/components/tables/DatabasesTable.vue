<template>
    <div
         v-if="
         databases && databases.length > 0 && registerDatabaseComponent === false
    "
    >
    <div class="top">
        <h5 class="tableTitle">Databases</h5>
        <el-button class="buttonRegisterComponent" @click="openRegisterComponent"
                   >Register a new Database</el-button
      >
    </div>
    <el-table
              class="card"
              v-if="databases && databases.length && databases.length > 0"
              :data="
              databases && databases.length && databases.length > 0 ? databases : []
        "
        highlight-current-row
        @current-change="handleCurrentChange"
        align="center"
        height="15rem"
        size="medium"
        >
        <el-table-column
                         width="150%"
                         label="Localname"
                         prop="LocalName"
                         class="localname"
                         >

        </el-table-column>
        <el-table-column label="Host" prop="Host"></el-table-column>
        <el-table-column label="Port" prop="Port"></el-table-column>
        <el-table-column label="Name" prop="Name"></el-table-column>
        <el-table-column align="right">
            <template #default="scope">
                <el-button size="mini" plain @click="showFinalizedPatterns(scope.row)"
                           >Choose Patterns</el-button
          >
                <el-button
                           size="mini"
                           type="danger"
                           icon="el-icon-delete"
                           circle
                           plain
                           title="Click to delete"
                           @click="
                           () => {
                handleCurrentChange(scope.row);
                open();
                }
                "
                ></el-button>
            </template>
        </el-table-column>
        <el-button></el-button>
        </el-table>
    <div v-if="selectedDatabase && selectedDatabase.length > 0">
        <h5
            class="selecteddb"
            v-if="
            finalizedPatternsOfDatabase && finalizedPatternsOfDatabase.length > 0
        "
        >
        Finalized Patterns of : {{ selectedDatabase }}
        </h5>
        <FinalizedPatternTable></FinalizedPatternTable>
    </div>
    <!-- <p v-if="finalizedPatternsOfDatabase && finalizedPatternsOfDatabase.length == 0 && this.selectedDatabase.length > 0 ">No Finalized Patterns available for : {{this.selectedDatabase}}</p> -->
    </div>
</template>

<script>
    import { mapActions, mapState } from "vuex";
    import RegisterDatabaseForm from "../forms/RegisterDatabaseForm.vue";
    import FinalizedPatternTable from "./FinalizedPatternTable.vue";

    export default {
        components: { RegisterDatabaseForm, FinalizedPatternTable },
        data() {
            return {
                selectedDatabase: "",
                params: this.$route.params.concretePatternName,
                setDatabaseSuccessMessage: "",
                setDatabaseErrorMessage: "",
            };
        },
        computed: mapState({
            databases: (state) => {
                return state.databases;
            },
            userDatabase: (state) => {
                return state.userDatabase;
            },
            errorMessage: (state) => {
                return state.errorMessage;
            },
            successMessage: (state) => {
                return state.successMessage;
            },
            registerDatabaseComponent: (state) => {
                return state.registerDatabaseComponent;
            },
            finalizedPatternsOfDatabase: (state) => {
                return state.finalizedPatternsOfDatabase;
            },
        }),
        methods: {
            ...mapActions([
                "callDatabases",
                "onUserDatabaseChoice",
                "clearMessages",
                "onDeleteDatabase",
                "onShowregisterDatabasecomponentOrNot",
                "onSetDatabaseOfPattern",
                "callFinalizedPatternsOfDatabase",
            ]),

            selectDatabase: function (value) {
                this.onUserDatabaseChoice(value);
            },
            openNotification(title, message, type) {
                this.$notify({
                    title,
                    message,
                    type,
                    position: "bottom-right",
                });
            },
            open() {
                this.$confirm(
                    `This will permanently delete the database with name < ${this.selectedDatabase} > .
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
            handleCurrentChange(row) {
                if (row) {
                    this.selectedDatabase = row.LocalName;
                }
            },
            async handleDelete() {
                await this.onDeleteDatabase(this.selectedDatabase);
                this.callDatabases();
            },
            openRegisterComponent() {
                this.$router.push(`/databases/registerDatabase`);
            },
            showFinalizedPatterns(row) {
                this.callFinalizedPatternsOfDatabase(row.LocalName);
            },
        },
    };
</script>

<style scoped>
    .select {
        width: 100%;
        margin-top: 0%;
        margin-bottom: 40%;

    }
    .el-select {
        margin: auto;

    }
    .titleForSelect {
        margin-top: 60%;

    }
    .el-table {
        cursor: pointer;
        margin-left: 5%;
        margin-right: 5%;
        width: 90%;

    }
    .card {
        margin-top: 2%;
        margin-bottom: 0%;

    }
    .tableTitle {
        margin-top: 1%;
        margin-bottom: 1%;
        text-align: left;
        margin-left: 5.5%;

    }
    .set {
        display: inline-flex;
        margin-bottom: 1rem;

    }
    .top {
        display: flex;
        margin-top: 2%;

    }
    .buttonRegisterComponent {
        margin-right: 5%;
        margin-left: 60%;

    }
    .selecteddb {
        margin-top: 2%;
        text-align: left;
        margin-left: 5.5%;

    }
</style>