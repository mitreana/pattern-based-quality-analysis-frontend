const messageActions = {
    clearMessages: (context) => {
        context.commit("resetMessages");
    },
};

export default messageActions;