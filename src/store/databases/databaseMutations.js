const databaseMutations = {
  registerDatabases: (state, databases) => {
    console.log("Databases are", databases);
    state.databases = [
       ...databases.filter(
         (database, index, array) =>
          array.findIndex((a) => a.Name === database.Name) === index
       ),
    ];
  },
  changeUserDatabase: (state, userChoice) => {
    console.log("User choice is", userChoice);
    state.userDatabase = userChoice;
  },
  //   registerUserDatabaseRegistrationInfo:(state,userChoice)=> {
  //     state.databaseRegistrationInfo = userChoice;
  //   }
  showregisterDatabasecomponentOrNot: (state, userValue) => {
    state.registerDatabaseComponent = userValue;
  },
  registerEmptyErrorMessage: (state, value) => {
    console.log("Look at this value", value);
    state.showEmptyErrorMessage = value;
  },
  changeDatabaseOfPattern: (state, userChoice) => {
    console.log("User choice", userChoice);
    console.log("opaaaa", userChoice.LocalName);
    state.userDatabaseDefault = userChoice;
  },
};

export default databaseMutations;
