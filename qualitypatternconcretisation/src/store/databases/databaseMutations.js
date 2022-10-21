const databaseMutations = {
    registerDatabases: (state, databases) => {
        state.databases = [
            ...databases.filter(
                (database, index, array) =>
                    array.findIndex((a) => a.LocalName === database.LocalName) === index
            ),
        ];
    },

    showregisterDatabasecomponentOrNot: (state, userValue) => {
        state.registerDatabaseComponent = userValue;
    },
    registerEmptyErrorMessage: (state, value) => {
        state.showEmptyErrorMessage = value;
    },
    changeDatabaseOfPattern: (state, userChoice) => {
        state.userDatabase = {
            ...state.userDatabase,
            [userChoice.patternName]: userChoice.database,
        };
    },
};

export default databaseMutations;