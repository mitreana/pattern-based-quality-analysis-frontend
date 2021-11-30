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

    if (concretePatternPayload.success) {
      concretePatternPayload.data = concretePatternPayload.data.replaceAll(
        ", }",
        "}"
      );
      const parsedconcretePatternPayload = JSON.parse(
        concretePatternPayload.data
      );
      context.commit("registerErrorMessage", "");
      context.commit("registerConcretePatterns", parsedconcretePatternPayload);
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

      //   context.commit("initializeParameters", concretePatternPayloadToJson.data);
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
  onFragmentValueChange: (context, { fragmentName, fragmentValue }) => {
    context.commit("updateFragmentValue", {
      name: fragmentName,
      value: fragmentValue,
    });
  },

  onFragmentTypeChange: (context, { fragmentName, fragmentType }) => {
    context.commit("updateFragmentType", {
      name: fragmentName,
      type: fragmentType,
    });
  },
};

export default concretePatternsActions;
