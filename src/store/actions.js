import AbstractPatternService from "../services/AbstractPatternService";
import ConcretePatternService from "../services/ConcretePatternService";

const actions = {
  onUserAbstractPatternChoice: async (context, userChoice) => {
    context.commit("changeUserAbstractPattern", userChoice);

    const abstractPatternTextPayload = await AbstractPatternService.getAbstractPatternTexts(
      userChoice
    );

    if (abstractPatternTextPayload.success) {
      context.commit("registerErrorMessage", "");
      context.commit(
        "registerAbstractPatternTexts",
        abstractPatternTextPayload.data
      );
    } else {
      context.commit("registerErrorMessage", data.message);
    }
  },
  onUserAbstractPatternTextChoice: (context, userChoice) => {
    context.commit("changeUserAbstractPatternText", userChoice);
  },
  onUserConcretePatternNameChoice: (context, userChoice) => {
    context.commit("changeUserConcretePatternName", userChoice);
  },
  resetUserConcretePatternInformation: (context) => {
    context.commit("resetUserConcretePatternInformation");
  },
  onUserConcretePatternTextChoice: (context, userChoice) => {
    context.commit("changeUserConcretePatternText", userChoice);
  },
  onActiveConcretePatternChoice: (context, userChoice) => {
    context.commit("changeActiveConcretePattern", userChoice);
  },
  callAbstractPatterns: async (context) => {
    const abstractPatternPayload = await AbstractPatternService.getAbstractPatterns();

    if (abstractPatternPayload.success) {
      context.commit("registerErrorMessage", "");
      context.commit("registerAbstractPatterns", abstractPatternPayload.data);
    } else {
      context.commit(
        "registerErrorMessage",
        abstractPatternPayload.data.message
      );
    }
  },
  callAbstractPatternTexts: async (context, abstractPattern) => {
    const abstractPatternTextPayload = await AbstractPatternService.getAbstractPatternTexts(
      abstractPattern
    );

    if (abstractPatternTextPayload.success) {
      context.commit("registerErrorMessage", "");
      context.commit(
        "registerAbstractPatternTexts",
        abstractPatternTextPayload.data
      );
    } else {
      context.commit(
        "registerErrorMessage",
        abstractPatternPayload.data.message
      );
    }
  },
  onCreateConcretePattern: async (context, body) => {
    context.commit("resetMessages");
    if (
      body.abstractPattern.length > 0 &&
      body.abstractPatternText.length > 0 &&
      body.concretePatternName.length > 0
    ) {
      const concretePatternPayload = await AbstractPatternService.postConcretePattern(
        body
      );

      if (concretePatternPayload.success) {
        context.commit("registerErrorMessage", "");
        context.commit("registerSuccessMessage", concretePatternPayload.data);
      } else {
        context.commit(
          "registerErrorMessage",
          concretePatternPayload.data.message
        );
      }
    }
  },
  callConcretePatterns: async (context) => {
    const concretePatternPayload = await ConcretePatternService.getConcretePatterns();

    if (concretePatternPayload.success) {
      const concretePatterns = await Promise.all(
        concretePatternPayload.data.map(async (concretePattern) => {
          const concretePatternTextPayload = await ConcretePatternService.getConcretePatternText(
            concretePattern
          );

          return Promise.resolve(concretePatternTextPayload.data);
        })
      );
      context.commit("registerErrorMessage", "");
      context.commit("registerConcretePatterns", concretePatterns);
    } else {
      context.commit(
        "registerErrorMessage",
        concretePatternPayload.data.message
      );
    }
  },
  clearMessages: (context) => {
    context.commit("clearMessages");
  },

  callConcretePatternText: async (context, concretePatternName) => {
    const concretePatternPayload = await ConcretePatternService.getConcretePatternText(
      concretePatternName
    );

    const concretePatternPayloadToJson = JSON.parse(
      JSON.stringify(concretePatternPayload)
    );

    if (concretePatternPayloadToJson.success) {
      context.commit("registerErrorMessage", "");
      context.commit(
        "registerConcretePatternText",
        concretePatternPayloadToJson.data
      );
      let index = 1;
      const parameterObject = concretePatternPayloadToJson.data.Fragments.filter(
        (d) => typeof d === "object"
      ).reduce((accumulator, value) => {
        //{"url":{id:"1",value:"something"},"url1":{id:"2",value:"something"}}
        accumulator[value.URL] = {
          id: index,
          value: value.Value !== undefined ? String(value.Value) : "",
          defaultValue: value.Value ? String(value.Value) : "",
          type: value.Type && value.Type === "Untyped" ? "Text" : value.Type,
          defaultType:
            value.Type && value.Type === "Untyped" ? "Text" : value.Type,
          visible:
            !value.hasOwnProperty("Dependent") ||
            !!(
              value.Dependent &&
              concretePatternPayloadToJson.data.Fragments.find((parameter) => {
                return (
                  parameter &&
                  parameter.Enable &&
                  parameter.Enable.Parameter &&
                  parameter.Enable.Parameter === value.URL &&
                  parameter.Enable.If === parameter.Value
                );
              })
            ),
          dependent: concretePatternPayloadToJson.data.Fragments.find(
            (parameter) => {
              return (
                parameter &&
                parameter.Enable &&
                parameter.Enable.Parameter &&
                parameter.Enable.Parameter === value.URL
              );
            }
          ),
          done: false,
        };
        index++;
        return accumulator;
      }, {});

      context.commit("initializeParameters", parameterObject);
    } else {
      context.commit(
        "registerErrorMessage",
        concretePatternPayloadToJson.data.message
      );
    }
  },
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

  onDelete: async (context, userChoice) => {
    const postDeletePayload = await ConcretePatternService.postDelete(
      userChoice
    );
    if (postDeletePayload.success) {
      context.commit("registerErrorMessage", "");
      context.commit("registerSuccessMessage", postDeletePayload.data);
    } else {
      context.commit("registerErrorMessage", postDeletePayload.data.message);
    }
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
  },
};

export default actions;
