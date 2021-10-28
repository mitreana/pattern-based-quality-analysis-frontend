import AbstractPatternService from "../../services/AbstractPatternService";
import ConcretePatternService from "../../services/ConcretePatternService";

const concretePatternsActions = {
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

    console.log(parsedconcretePatternPayload);
    if (concretePatternPayload.success) {
      // concretePatternPayload.data = concretePatternPayload.data.replaceAll(
      //   ", }",
      //   "}"
      // );
      // const parsedconcretePatternPayload = JSON.parse(
      //   concretePatternPayload.data
      // );
      const concretePatterns = await Promise.all(
        concretePatternPayload.data.Name.map(async (concretePattern) => {
          const concretePatternTextPayload = await ConcretePatternService.getConcretePatternText(
            concretePattern
          );
          return Promise.resolve(concretePatternTextPayload.data);
        })
      );
      context.commit("registerErrorMessage", "");
      context.commit(
        "registerConcretePatterns",
        concretePatterns.filter(
          (concretePattern) => concretePattern.PatternName
        )
      );
    } else {
      context.commit(
        "registerErrorMessage",
        concretePatternPayload.data.message
      );
    }
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
      console.log(parameterObject);
      context.commit("initializeParameters", parameterObject);
    } else {
      context.commit(
        "registerErrorMessage",
        concretePatternPayloadToJson.data.message
      );
    }
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

    context.commit("resetMessages");
  },
};

export default concretePatternsActions;
