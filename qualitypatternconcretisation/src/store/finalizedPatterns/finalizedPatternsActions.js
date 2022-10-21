import FinalizedPatternsService from "../../services/FinalizedPatternsService";
import finalizedPatternsInitialData from "./finalizedPatternsState";

const finalizedPatternsActions = {
    callFinalizedPatterns: async (context) => {
        const finalizedPatternsPayload = await FinalizedPatternsService.getFinalizedPatterns();
        if (finalizedPatternsPayload.success) {
            context.commit("registerErrorMessage", "");
            context.commit(
                "registerFinalizedPatterns",
                finalizedPatternsPayload.data
            );
        } else {
            context.commit(
                "registerErrorMessage",
                finalizedPatternsPayload.data.message
            );
        }
    },
    callFinalizedPatternsOfDatabase: async (context, localName) => {
        const finalizedPatternsOfDatabasePayload = await FinalizedPatternsService.getFinalizedPatternsOfDatabase(
            localName
        );
        if (finalizedPatternsOfDatabasePayload.success) {
            context.commit("registerErrorMessage", "");
            context.commit(
                "registeFinalizedPatternsOfDatabase",
                finalizedPatternsOfDatabasePayload.data
            );
        } else {
            context.commit(
                "registerErrorMessage",
                finalizedPatternsOfDatabasePayload.data.message
            );
        }
    },
    onApplyPatterns: async (context, multipleSelection) => {
        try {
            const applyPatternsPayload = await FinalizedPatternsService.postApplyPatterns(
                multipleSelection.map((selection) => selection.Name)
            );

            if (applyPatternsPayload.success) {
                context.commit(
                    "registerApplyPatternsResponse",
                    applyPatternsPayload.data
                );
            } else {
                context.commit(
                    "registerApplyPatternsErrorMessage",
                    applyPatternsPayload.data.message
                );
            }
        } catch (err) {
            context.commit("registerApplyPatternsErrorMessage", err.message);
        }
    },
    onResetApplyPatternsResponse: (context) => {
        context.commit("resetApplyPatternsResponse");
    },
};
export default finalizedPatternsActions;