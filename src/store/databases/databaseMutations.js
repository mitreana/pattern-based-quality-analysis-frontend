const databaseMutations = {
  registerDatabases: (state, databases) => {
    state.databases = [...databases];
  },
  changeUserDatabase: (state, userChoice) => {
    state.userDatabase = userChoice;
  },
  //   registerUserDatabaseRegistrationInfo:(state,userChoice)=> {
  //     state.databaseRegistrationInfo = userChoice;
  //   }
  showregisterDatabasecomponentOrNot:(state,userValue) =>{
      state.registerDatabaseComponent = userValue
  }
};

export default databaseMutations