import { createStore } from "vuex";
import actions from "./actions";
import mutations from "./mutations";
import abstractPatternInitialState from "./abstractPatterns/abstractPatternsState";
import concretePatternInitialState from "./concretePatterns/concretePatternsState";
import concretePatternSentenceInitialState from "./concretePatternSentence/concretePatternSentenceState";
import messageInitialState from "./message/messageState";
import databaseInitialState from "./databases/databaseState"
import finalizedPatternsInitialData from "./finalizedPatterns/finalizedPatternsState";

const initialData = {
  ...abstractPatternInitialState,
  ...concretePatternInitialState,
  ...concretePatternSentenceInitialState,
  ...messageInitialState,
  ...databaseInitialState,
  ...finalizedPatternsInitialData
};

const store = createStore({
  state() {
    return initialData;
  },
  actions: actions,
  mutations: mutations,
});

export default store;
