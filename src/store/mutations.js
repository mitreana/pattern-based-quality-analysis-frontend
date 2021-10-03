const mutations = {
  changeUserAbstractPattern: (state, userChoice) => {
    state.userAbstractPattern = userChoice;
    state.submitted = false;
  },
  changeUserAbstractPatternText: (state, userChoice) => {
    state.userAbstractPatternText = userChoice;
    state.submitted = false;
  },
  changeUserConcretePatternName: (state, userChoice) => {
    state.userConcretePatternName = userChoice;
    state.submitted = false;
  },
  changeActiveConcretePattern: (state, userChoice) => {
    state.activeConcretePattern = userChoice;
  },
  resetMessages: (state) => {
    state.errorMessage = "";
    state.successMessage = "";
  },
  resetUserConcretePatternInformation: (state) => {
    state.userAbstractPatternText = "";
    state.userConcretePatternName = "";
    state.abstractPatternTexts = [];
  },
  registerAbstractPatterns: (state, abstractPatterns) => {
    state.abstractPatterns = [...abstractPatterns];
  },
  registerAbstractPatternTexts: (state, abstractPatternTexts) => {
    state.abstractPatternTexts = [...abstractPatternTexts];
  },
  registerConcretePatterns: (state, concretePatterns) => {
    state.concretePatterns = [...concretePatterns];
  },
  registerErrorMessage: (state, errorMessage) => {
    state.errorMessage = errorMessage;
  },
  registerSuccessMessage: (state, successMessage) => {
    state.successMessage = successMessage;
  },
  registerConcretePatternText: (state, concretePatternText) => {
    state.concretePatternTextObject = concretePatternText;
  },
  clearMessages: (state) => {
    state.errorMessage = "";
    state.successMessage = "";
  },
  registerParameter: (state, URL, parameterValue) => {
    state.userParameterValue = parameterValue;
    state.userParameterUrl = URL;
  },
  changeUserParameterValueChoice: (state, userChoice) => {
    state.userParameterValue = userChoice;
  },
  initializeParameters: (state, parameterObject) => {
    state.concretePatternParameters = { ...parameterObject };
  },
  registerParameterValue: (state, payload) => {
    const childParameter = Object.keys(state.concretePatternParameters).find(
      (concretePatternParameterKey) => {
        return (
          state.concretePatternParameters[concretePatternParameterKey] &&
          state.concretePatternParameters[concretePatternParameterKey]
            .dependent &&
          state.concretePatternParameters[concretePatternParameterKey].dependent
            .URL === payload.url &&
          state.concretePatternParameters[concretePatternParameterKey].dependent
            .Enable.If === payload.value
        );
      }
    );

    const notChildParameter = Object.keys(state.concretePatternParameters).find(
      (concretePatternParameterKey) => {
        return (
          state.concretePatternParameters[concretePatternParameterKey] &&
          state.concretePatternParameters[concretePatternParameterKey]
            .dependent &&
          state.concretePatternParameters[concretePatternParameterKey].dependent
            .URL === payload.url &&
          state.concretePatternParameters[concretePatternParameterKey].dependent
            .Enable.If !== payload.value
        );
      }
    );

    if (childParameter) {
      state.concretePatternParameters[childParameter] = {
        ...state.concretePatternParameters[childParameter],
        visible: true,
      };
    } else if (notChildParameter) {
      state.concretePatternParameters[notChildParameter] = {
        ...state.concretePatternParameters[notChildParameter],
        visible: false,
      };
    }

    state.concretePatternParameters[payload.url] = {
      ...state.concretePatternParameters[payload.url],
      value: payload.value,
    };
  },

  registerParameterType: (state, payload) => {
    state.concretePatternParameters[payload.url] = {
      ...state.concretePatternParameters[payload.url],
      type: payload.type,
    };
  },

  registerActiveParameter: (state, payload) => {
    state.activeParameter = payload;
  },
};

export default mutations;
