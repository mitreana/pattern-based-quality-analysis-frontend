import abstractPatternsMutations from "./abstractPatterns/abstractPatternsMutations";
import concretePatternsMutations from "./concretePatterns/concretePatternsMutations";
import concretePatternSentenceMutations from "./concretePatternSentence/concretePatternSentenceMutations";
import messageMutations from "./message/messageMutations";

const mutations = {
  ...abstractPatternsMutations,
  ...concretePatternsMutations,
  ...concretePatternSentenceMutations,
  ...messageMutations,
};

export default mutations;
