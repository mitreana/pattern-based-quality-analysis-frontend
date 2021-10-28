const concretePatternsMutations = {
  registerErrorMessage: (state, errorMessage) => {
    state.errorMessage = errorMessage;
  },
  registerSuccessMessage: (state, successMessage) => {
    state.successMessage = successMessage;
  },
  changeUserConcretePatternName: (state, userChoice) => {
    state.userConcretePatternName = userChoice;
    state.submitted = false;
  },
  changeActiveConcretePattern: (state, userChoice) => {
    state.activeConcretePattern = userChoice;
  },
  resetUserConcretePatternInformation: (state) => {
    state.userAbstractPatternText = "";
    state.userConcretePatternName = "";
    state.abstractPatternTexts = [];
  },
  registerConcretePatterns: (state, concretePatterns) => {
    state.concretePatterns = [...concretePatterns];
  },
  registerConcretePatternText: (state, concretePatternText) => {
    
    state.concretePatternTextObject = concretePatternText;
  },
};

export default concretePatternsMutations;
