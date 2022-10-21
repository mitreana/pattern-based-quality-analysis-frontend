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
    if (concretePatternText.Fragments) {
      concretePatternText.Fragments = concretePatternText.Fragments.map(
        (fragment) => {
          if (typeof fragment === "string") {
            return fragment;
          }

          if (
            fragment.Value !== null &&
            fragment.Value !== undefined &&
            (fragment.Value.length > 0 ||
              typeof Number(fragment.Value) === "number")
          ) {
            return { ...fragment, concretized: true };
          }

          return {
            ...fragment,
            concretized: false,
          };
        }
      );
    }
    state.concretePatternTextObject = concretePatternText;
  },
  setConcretizedParameter: (state, parameterName) => {
    state.concretePatternTextObject = {
      ...state.concretePatternTextObject,
      Fragments: state.concretePatternTextObject.Fragments.map((fragment) => {
        if (fragment.Name === parameterName) {
          return {
            ...fragment,
            concretized: true,
          };
        }

        return fragment;
      }),
    };
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
  registerPatternDescription: (state, userPatternDescription) => {
    state.userPatternDescription = userPatternDescription;
  },
  parameterStartPosting: (state) => {
    state.concretePatternParameterPosting = true;
  },
  parameterStopPosting: (state) => {
    state.concretePatternParameterPosting = false;
  },
};

export default concretePatternsMutations;
