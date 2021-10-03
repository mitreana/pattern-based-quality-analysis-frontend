import { createStore } from "vuex";
import actions from "./actions";
import mutations from "./mutations";

const initialData = {
  userAbstractPattern: "",
  userAbstractPatternText: "",
  userConcretePatternName: "",
  userConcretePatternText: "",
  userParameterValue: "",
  userParameterUrl: "",
  abstractPatterns: [],
  concretePatterns: [],
  concretePatternNameTableChoice: "",
  abstractPatternTexts: [],
  concretePatternTextObject: {},
  errorMessage: "",
  successMessage: "",
  submited: false,
  concretePatternParameters: {},
  activeConcretePattern: "",
  activeParameter: "",
};

const store = createStore({
  state() {
    return initialData;
  },
  actions: actions,
  mutations: mutations,
});

export default store;
