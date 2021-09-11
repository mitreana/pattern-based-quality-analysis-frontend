//import { use } from "vue/types/umd";
//import AbstractPatternService from "../services/AbstractPatternService";

const mutations = {
  changeUserAbstractPattern: (state, userChoice) => {
    state.userAbstractPattern = userChoice;
    state.submitted = false;
    state.validationErrors.abstractPattern = false;
  },
  changeUserAbstractPatternText: (state, userChoice) => {
    state.userAbstractPatternText = userChoice;
    state.submitted = false;
    state.validationErrors.abstractPatternText = false;
  },
  changeUserConcretePatternName: (state, userChoice) => {
    state.userConcretePatternName = userChoice;
    state.submitted = false;
    state.validationErrors.concretePatternName = false;
  },
  changeActiveConcretePattern: (state, userChoice) => {
    console.log("Mutation entered", userChoice);
    state.activeConcretePattern = userChoice;
  },
  resetUserConcretePatternInformation: (state) => {
    state.userAbstractPatternText = "";
    state.userConcretePatternName = "";
    state.abstractPatternTexts = [];
  },
  registerAbstractPatterns: (state, abstractPatterns) => {
    state.abstractPatterns = [...abstractPatterns];
  },
  registerAbstractPatternTexts: (state, abstractPatternTexts) => {
    state.abstractPatternTexts = [...abstractPatternTexts];
  },
  registerConcretePatterns: (state, concretePatterns) => {
    state.concretePatterns = [...concretePatterns];
  },
  registerErrorMessage: (state, errorMessage) => {
    state.errorMessage = errorMessage;
  },
  registerSuccessMessage: (state, successMessage) => {
    state.successMessage = successMessage;
    console.log(successMessage);
  },
  validateUserInputs: (state) => {
    state.submitted = true;
    //if user didnt entered a field show invalid
    if (state.userAbstractPattern.length === 0) {
      state.validationErrors.abstractPattern = true;
      state.validationErrors.abstractPatternText = true;
      state.validationErrors.concretePatternName = true;
    } else if (state.userAbstractPatternText.length === 0) {
      state.validationErrors.abstractPatternText = true;
      state.validationErrors.concretePatternName = true;
    } else if (state.userConcretePatternName.length === 0) {
      state.validationErrors.concretePatternName = true;
    }
  },
  registerConcretePatternText: (state, concretePatternText) => {
    state.concretePatternTextObject = concretePatternText;
  },
  clearMessages: (state) => {
    state.errorMessage = "";
    state.successMessage = "";
  },
  registerParameter: (state, URL, parameterValue) => {
    state.userParameterValue = parameterValue;
    state.userParameterUrl = URL;
  },
  changeUserParameterValueChoice: (state, userChoice) => {
    state.userParameterValue = userChoice;
  },
  initializeParameters: (state, parameterObject) => {
    state.concretePatternParameters = { ...parameterObject };
  },
  registerParameterValue: (state, payload) => {
    state.concretePatternParameters[payload.url] = {
      ...state.concretePatternParameters[payload.url],
      value: payload.value,
    };
  },

  registerParameterType: (state, payload) => {
    state.concretePatternParameters[payload.url] = {
      ...state.concretePatternParameters[payload.url],
      type: payload.type,
    };
  },
};

export default mutations;
