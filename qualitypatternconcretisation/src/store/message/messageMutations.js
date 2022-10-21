const messageMutations = {
  resetMessages: (state) => {
    state.errorMessage = "";
    state.successMessage = "";
  },
  registerErrorMessage: (state, errorMessage) => {
    state.errorMessage = errorMessage;
  },
  registerSuccessMessage: (state, successMessage) => {
    state.successMessage = successMessage;
  },
};

export default messageMutations;
