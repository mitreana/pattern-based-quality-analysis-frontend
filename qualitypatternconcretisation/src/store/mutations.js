import abstractPatternsMutations from "./abstractPatterns/abstractPatternsMutations";
import concretePatternsMutations from "./concretePatterns/concretePatternsMutations";
import concretePatternSentenceMutations from "./concretePatternSentence/concretePatternSentenceMutations";
import databaseMutations from "./databases/databaseMutations"
import finalizedPatternsMutations from "./finalizedPatterns/finalizedPatternsMutations";
import messageMutations from "./message/messageMutations";

const mutations = {
    ...abstractPatternsMutations,
    ...concretePatternsMutations,
    ...concretePatternSentenceMutations,
    ...messageMutations,
    ...databaseMutations,
    ...finalizedPatternsMutations,
};

export default mutations;
