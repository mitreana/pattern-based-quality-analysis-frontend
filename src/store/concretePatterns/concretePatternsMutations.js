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
  updateFragmentValue: (state, fragmentPayload) => {
    state.activeParameter.Value = fragmentPayload.value;
    state.concretePatternTextObject = {
      ...state.concretePatternTextObject,
      Fragments: state.concretePatternTextObject.Fragments.map((fragment) => {
        if (typeof fragment === "object") {
          if (fragment.Name === fragmentPayload.name) {
            return {
              ...fragment,
              Value: fragmentPayload.value,
            };
          }

          return fragment;
        }

        return fragment;
      }),
    };
  },

  updateFragmentType: (state, fragmentPayload) => {
    state.activeParameter.Type = fragmentPayload.type;
    state.concretePatternTextObject = {
      ...state.concretePatternTextObject,
      Fragments: state.concretePatternTextObject.Fragments.map((fragment) => {
        if (typeof fragment === "object") {
          if (fragment.Name === fragmentPayload.name) {
            return {
              ...fragment,
              Type: fragmentPayload.type,
            };
          }

          return fragment;
        }

        return fragment;
      }),
    };
  },
};

export default concretePatternsMutations;
