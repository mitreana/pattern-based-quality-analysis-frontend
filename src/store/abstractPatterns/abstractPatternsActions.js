import AbstractPatternService from "../../services/AbstractPatternService";

const abstractPatternsActions = {
  onUserAbstractPatternChoice: async (context, userChoice) => {
    context.commit("changeUserAbstractPattern", userChoice);

    const abstractPatternTextPayload = await AbstractPatternService.getAbstractPatternTexts(
      userChoice
    );

    abstractPatternTextPayload.data = abstractPatternTextPayload.data.replaceAll(
      ", }",
      "}"
    );

    const parsedAbstractPatternTextPayload = JSON.parse(
      abstractPatternTextPayload.data
    );

    if (abstractPatternTextPayload.success) {
      context.commit("registerErrorMessage", "");
      context.commit(
        "registerAbstractPatternTexts",
        parsedAbstractPatternTextPayload
      );
    } else {
      context.commit("registerErrorMessage", data.message);
    }
  },
  onUserAbstractPatternTextChoice: (context, userChoice) => {
    context.commit("changeUserAbstractPatternText", userChoice);
  },
  callAbstractPatterns: async (context) => {
    const abstractPatternPayload = await AbstractPatternService.getAbstractPatterns();

    if (abstractPatternPayload.success) {
      abstractPatternPayload.data = abstractPatternPayload.data.replaceAll(
        ", }",
        "}"
      );

      const parsedAbstractPatternPayload = JSON.parse(
        abstractPatternPayload.data
      );
      console.log(parsedAbstractPatternPayload);

      context.commit("registerErrorMessage", "");
      context.commit("registerAbstractPatterns", parsedAbstractPatternPayload);
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
};

export default abstractPatternsActions;
