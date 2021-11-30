import FinalizedPatternsService from "../../services/FinalizedPatternsService"

const finalizedPatternsActions = {

  callFinalizedPatterns: async (context) => {
    const finalizedPatternsPayload = await FinalizedPatternsService.getFinalizedPatterns()
    if (finalizedPatternsPayload.success) {
      finalizedPatternsPayload.data = finalizedPatternsPayload.data.replaceAll(", }", "}");
      const parsedfinalizedPatternsPayload = JSON.parse(finalizedPatternsPayload.data);
      context.commit("registerErrorMessage", "");
      context.commit("registerFinalizedPatterns", parsedfinalizedPatternsPayload);
    } else {
      context.commit("registerErrorMessage", parsedfinalizedPatternsPayload.message);
    }
  },
};
export default finalizedPatternsActions