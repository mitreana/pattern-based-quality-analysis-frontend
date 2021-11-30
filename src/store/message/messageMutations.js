const messageMutations = {
  resetMessages: (state) => {
    state.errorMessage = "";
    state.successMessage = "";
  },
  registerErrorMessage: (state, errorMessage) => {
    state.errorMessage = errorMessage;
    console.log(state.errorMessage);
  },
  registerSuccessMessage: (state, successMessage) => {
    console.log("Mutation entered");
    console.log(successMessage);
    state.successMessage = successMessage;
  },
};

export default messageMutations;
