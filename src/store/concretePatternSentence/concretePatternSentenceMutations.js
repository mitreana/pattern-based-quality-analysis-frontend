const concretePatternSentenceMutations = {
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

export default concretePatternSentenceMutations;
