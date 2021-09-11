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
  abstractPatternTexts: [],
  concretePatternTextObject: {},
  errorMessage: "",
  successMessage: "",
  validationErrors: {
    abstractPattern: true,
    abstractPatternText: true,
    concretePatternName: true,
    concretePattern: true,
  },
  submited: false,
  concretePatternParameters: {},
  activeConcretePattern: "",
};

const store = createStore({
  state() {
    return initialData;
  },
  actions: actions,
  mutations: mutations,
});

export default store;
