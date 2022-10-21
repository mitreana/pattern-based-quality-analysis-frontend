import AbstractPatternService from "../../services/AbstractPatternService";

const abstractPatternsActions = {
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
};

export default abstractPatternsActions;