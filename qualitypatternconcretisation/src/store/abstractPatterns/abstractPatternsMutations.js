const abstractPatternsMutations = {
    changeUserAbstractPattern: (state, userChoice) => {
        state.userAbstractPattern = userChoice;
        state.submitted = false;
    },
    changeUserAbstractPatternText: (state, userChoice) => {
        state.userAbstractPatternText = userChoice;
        state.submitted = false;
    },
    registerAbstractPatterns: (state, abstractPatterns) => {
        state.abstractPatterns = [...abstractPatterns];

    },
    registerAbstractPatternTexts: (state, abstractPatternTexts) => {
        state.abstractPatternTexts = [...abstractPatternTexts];
    },
};

export default abstractPatternsMutations;