import abstractPatternsActions from "./abstractPatterns/abstractPatternsActions";
import concretePatternsActions from "./concretePatterns/concretePatternsActions";
import concretePatternSentenceActions from "./concretePatternSentence/concretePatternSentenceActions";
import messageActions from "./message/messageActions";

const actions = {
  ...abstractPatternsActions,
  ...concretePatternsActions,
  ...concretePatternSentenceActions,
  ...messageActions,
};

export default actions;
