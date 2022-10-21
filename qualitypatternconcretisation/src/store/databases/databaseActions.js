import DatabaseService from "../../services/DatabaseService";

const databaseActions = {
    callDatabases: async (context) => {
        const databasesPayload = await DatabaseService.getDatabases();

        if (databasesPayload.success) {
            if (databasesPayload.data.length == 0) {
                const parsedDatabasesPayload1 = JSON.parse(
                    JSON.stringify(databasesPayload.data)
                );
                context.commit("registerDatabases", parsedDatabasesPayload1);
            }
            context.commit("registerErrorMessage", "");
            if (databasesPayload.data.length > 0) {
                databasesPayload.data = databasesPayload.data.replaceAll(", }", "}");
                const parsedDatabasesPayload = JSON.parse(databasesPayload.data);
                context.commit("registerDatabases", parsedDatabasesPayload);
            }
        } else {
            context.commit("registerDatabases", []);
            context.commit("registerErrorMessage", databasesPayload.data.message);
        }
    },

    onUserDatabaseChoice: (context, userChoice) => {
        // context.commit("changeUserDatabase", userChoice);
    },
    onUserDatabaseRegistration: async (context, body) => {
        const registerDatabasePayload = await DatabaseService.postRegisterDatabase(
            body
        );

        if (registerDatabasePayload.success) {
            context.commit("registerErrorMessage", "");
            context.commit("registerSuccessMessage", registerDatabasePayload.data);
        } else {
            context.commit(
                "registerErrorMessage",
                registerDatabasePayload.data.message
            );
        }
    },
    onDeleteDatabase: async (context, userChoice) => {
        const postDeletePayload = await DatabaseService.deleteDatabase(userChoice);
        if (postDeletePayload.success) {
            context.commit("registerErrorMessage", "");
            context.commit("registerSuccessMessage", postDeletePayload.data);
        } else {
            context.commit("registerErrorMessage", postDeletePayload.data.message);
        }

        context.commit("resetMessages");
    },
    onShowregisterDatabasecomponentOrNot: (context, userValue) => {
        context.commit("showregisterDatabasecomponentOrNot", userValue);
    },
    onSetDatabaseOfPattern: async (context, userChoice) => {
        const postSetDatabaseOfPatternPayload = await DatabaseService.postSetDatabaseOfPattern(
            userChoice
        );

        if (postSetDatabaseOfPatternPayload.success) {
            context.commit("registerErrorMessage", "");
            context.commit(
                "registerSuccessMessage",
                postSetDatabaseOfPatternPayload.data
            );
            context.commit("changeDatabaseOfPattern", {
                database: {
                    LocalName: userChoice.localName,
                },
                patternName: userChoice.patternName,
            });
        } else {
            context.commit("registerEmptyErrorMessage", true);
            context.commit(
                "registerErrorMessage",
                postSetDatabaseOfPatternPayload.data.message
            );
            context.commit("changeDatabaseOfPattern", {
                database: null,
                patternName: userChoice.patternName,
            });
        }
    },

    toggleEmptyErrorMessage: async (context, value) => {
        context.commit("registerEmptyErrorMessage", value);
    },

    callDatabaseOfPattern: async (context, userChoice) => {
        const databaseOfPatternPayload = await DatabaseService.getDatabasesOfPattern(
            userChoice
        );

        if (databaseOfPatternPayload.success) {
            context.commit("registerErrorMessage", "");
            context.commit("changeDatabaseOfPattern", {
                database: databaseOfPatternPayload.data,
                patternName: userChoice,
            });
        } else {
            context.commit("changeDatabaseOfPattern", {
                database: null,
                patternName: userChoice,
            });
            context.commit("registerErrorMessage", databaseOfPatternPayload.message);
        }
    },
};

export default databaseActions;