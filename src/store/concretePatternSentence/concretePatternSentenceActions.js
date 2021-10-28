import ConcretePatternService from "../../services/ConcretePatternService";

const concretePatternSentenceActions = {
  onInitializeParameters: (context, parameters) => {
    let index = 1;
    const parameterObject = parameters.reduce((accumulator, value) => {
      //{"url":{id:"1",value:"something"},"url1":{id:"2",value:"something"}}
      accumulator[value.URL] = {
        id: index,
        value: value.Value ? String(value.Value) : "",
        defaultValue: value.Value ? String(value.Value) : "",
        type: value.Type && value.Type === "Untyped" ? "Text" : value.Type,
        defaultType:
          value.Type && value.Type === "Untyped" ? "Text" : value.Type,
        visible:
          !value.hasOwnProperty("Dependent") ||
          (value.hasOwnProperty("Dependent") &&
            parameters.find((parameter) => {
              return (
                parameter &&
                parameter.Enable &&
                parameter.Enable.Parameter &&
                parameter.Enable.Parameter === value.URL &&
                parameter.Enable.If === parameter.Value
              );
            })),
        dependent: parameters.find(
          (parameter) =>
            parameter &&
            parameter.Enable &&
            parameter.Enable.Parameter &&
            parameter.Enable.Parameter === value.URL
        ),
        done: false,
      };
      index++;
      return accumulator;
    }, {});
    context.commit("initializeParameters", parameterObject);
  },
  onConcretizeParameter: async (
    context,
    URL,
    parameterValue,
    parameterType
  ) => {
    const concretizeParameterPayload = await ConcretePatternService.postConcretiseParameter(
      URL,
      parameterValue,
      parameterType
    );
    if (concretizeParameterPayload.success) {
      context.commit("registerErrorMessage", "");
      context.commit("registerSuccessMessage", concretizeParameterPayload.data);
    } else {
      context.commit(
        "registerEroorMessage",
        concretizeParameterPayload.data.message
      );
    }
  },

  onUserParameterValueChoice: (context, payload) => {
    context.commit("registerParameterValue", payload);
  },

  onUserParameterTypeChoice: (context, payload) => {
    context.commit("registerParameterType", payload);
  },

  selectActiveParameter: (context, payload) => {
    context.commit("registerActiveParameter", payload);
  },

  onFinalization: async (context, userChoice) => {
    const postFinalizationPayload = await ConcretePatternService.postFinalizeConcretisation(
      userChoice
    );
    if (postFinalizationPayload.success) {
      context.commit("registerErrorMessage", "");
      context.commit("registerSuccessMessage", postFinalizationPayload.data);
    } else {
      context.commit(
        "registerErrorMessage",
        postFinalizationPayload.data.message
      );
    }

    setTimeout(() => {
      context.commit("resetMessages");
    }, 1000);
  },
};

export default concretePatternSentenceActions;
