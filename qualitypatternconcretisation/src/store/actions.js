import abstractPatternsActions from "./abstractPatterns/abstractPatternsActions";
import concretePatternsActions from "./concretePatterns/concretePatternsActions";
import concretePatternSentenceActions from "./concretePatternSentence/concretePatternSentenceActions";
import databaseActions from "./databases/databaseActions";
import messageActions from "./message/messageActions";
import finalizedPatternsActions from "./finalizedPatterns/finalizedPatternsActions"

const actions = {
  ...abstractPatternsActions,
  ...concretePatternsActions,
  ...concretePatternSentenceActions,
  ...messageActions,
  ...databaseActions,
  ...finalizedPatternsActions,
};

export default actions;
