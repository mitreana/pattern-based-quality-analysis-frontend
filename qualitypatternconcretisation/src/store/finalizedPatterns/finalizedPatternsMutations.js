const finalizedPatternsMutations = {
    registerFinalizedPatterns: (state, finalizedPatterns) => {
        state.finalizedPatterns = [...finalizedPatterns];
    },
    registeFinalizedPatternsOfDatabase: (state, finalizedPatternsOfDatabase) => {
        state.finalizedPatternsOfDatabase = [...finalizedPatternsOfDatabase];
    },
    registerApplyPatternsResponse: (state, applyPatternsResponse) => {
        state.applyPatternsResponse = applyPatternsResponse;
    },
    registerApplyPatternsErrorMessage: (state, applyPatternsErrorMessage) => {
        state.applyPatternsErrorMessage = applyPatternsErrorMessage;
    },
    resetApplyPatternsResponse: (state) => {
        state.applyPatternsResponse = "";
    },
};

export default finalizedPatternsMutations;