import AbstractPatternService from "../services/AbstractPatternService";
import ConcretePatternService from "../services/ConcretePatternService";

const actions = {
  onUserAbstractPatternChoice: async (context, userChoice) => {
    context.commit("changeUserAbstractPattern", userChoice);

    const abstractPatternTextPayload = await AbstractPatternService.getAbstractPatternTexts(
      userChoice
    );

    //we call the method of the service and we pass to it the userChoice
    //in order the api to be called it needs the text which is onChoice
    //we call this each time the abstract pattern choice changes sot that the texts will be updated

    if (abstractPatternTextPayload.success) {
      context.commit("registerErrorMessage", "");
      context.commit(
        "registerAbstractPatternTexts",
        abstractPatternTextPayload.data
      ); //we call the mutation to pass the data from the call to our initial
      // data abstractPatternTextswhich are then accessible from the store
    } else {
      context.commit("registerErrorMessage", data.message);
    }
  },
  onUserAbstractPatternTextChoice: (context, userChoice) => {
    context.commit("changeUserAbstractPatternText", userChoice);
  },
  onUserConcretePatternNameChoice: (context, userChoice) => {
    context.commit("changeUserConcretePatternName", userChoice);
  },
  resetUserConcretePatternInformation: (context) => {
    context.commit("resetUserConcretePatternInformation");
  },
  onUserConcretePatternTextChoice: (context, userChoice) => {
    context.commit("changeUserConcretePatternText", userChoice);
  },
  onActiveConcretePatternChoice: (context, userChoice)=> {
    context.commit("changeActiveConcretePattern",userChoice)
  },
  callAbstractPatterns: async (context) => {
    const abstractPatternPayload = await AbstractPatternService.getAbstractPatterns();

    if (abstractPatternPayload.success) {
      context.commit("registerErrorMessage", "");
      context.commit("registerAbstractPatterns", abstractPatternPayload.data);
    } else {
      context.commit(
        "registerErrorMessage",
        abstractPatternPayload.data.message
      );
    }
  },
  callAbstractPatternTexts: async (context, abstractPattern) => {
    const abstractPatternTextPayload = await AbstractPatternService.getAbstractPatternTexts(
      abstractPattern
    );

    if (abstractPatternTextPayload.success) {
      context.commit("registerErrorMessage", "");
      context.commit(
        "registerAbstractPatternTexts",
        abstractPatternTextPayload.data
      );
    } else {
      context.commit(
        "registerErrorMessage",
        abstractPatternPayload.data.message
      );
    }
  },
  onCreateConcretePattern: async (context, body) => {
    context.commit("validateUserInputs");

    if (
      body.abstractPattern.length > 0 &&
      body.abstractPatternText.length > 0 &&
      body.concretePatternName.length > 0
    ) {
      const concretePatternPayload = await AbstractPatternService.postConcretePattern(
        body
      );

      if (concretePatternPayload.success) {
        context.commit("registerErrorMessage", "");
        context.commit("registerSuccessMessage", concretePatternPayload.data);
      } else {
        context.commit(
          "registerErrorMessage",
          concretePatternPayload.data.message
        );
      }
    }
  },
  callConcretePatterns: async (context) => {
    const concretePatternPayload = await ConcretePatternService.getConcretePatterns();

    if (concretePatternPayload.success) {
      context.commit("registerErrorMessage", "");
      context.commit("registerConcretePatterns", concretePatternPayload.data);
    } else {
      context.commit(
        "registerErrorMessage",
        concretePatternPayload.data.message
      );
      //message: property of error object
    }
  },
  clearMessages: (context) => {
    context.commit("clearMessages");
  },

  callConcretePatternText: async (context, concretePatternName) => {
    const concretePatternPayload = await ConcretePatternService.getConcretePatternText(
      concretePatternName
    );

    const concretePatternPayloadToJson = JSON.parse(
      JSON.stringify(concretePatternPayload)
    );

    if (concretePatternPayloadToJson.success) {
      context.commit("registerErrorMessage", "");
      context.commit(
        "registerConcretePatternText",
        concretePatternPayloadToJson.data
      );
      let index = 1;
      const parameterObject = concretePatternPayloadToJson.data.Fragments.filter(
        (d) => typeof d === "object"
      ).reduce((accumulator, value) => {
        //{"url":{id:"1",value:"something"},"url1":{id:"2",value:"something"}}
        accumulator[value.URL] = {
          id: index,
          value: value.Value ? String(value.Value) : "",
          type: value.Type && value.Type === "Untyped" ? "Text" : value.Type,
          done: false,
        };
        index++;
        return accumulator;
      }, {});

      // Iterates the parameter array and creates and object which holds the parameter Url as a key
      // unique identifier and the value and type of the parameter as the properties for the value

      context.commit("initializeParameters", parameterObject);
    } else {
      context.commit(
        "registerErrorMessage",
        concretePatternPayloadToJson.data.message
      );
      //message property of error object
    }
  },
  onInitializeParameters: (context, parameters) => {
    let index = 1;
    const parameterObject = parameters.reduce((accumulator, value) => {
      //{"url":{id:"1",value:"something"},"url1":{id:"2",value:"something"}}
      accumulator[value.URL] = {
        id: index,
        value: value.Value ? String(value.Value) : "",
        type: value.Type && value.Type === "Untyped" ? "Text" : value.Type,
        done: false,
      };
      index++;
      return accumulator;
    }, {});

    // Iterates the parameter array and creates and object which holds the parameter Url as a key
    // unique identifier and the value and type of the parameter as the properties for the value

    context.commit("initializeParameters", parameterObject);
  },
  onConcretizeParameter: async (context, URL, parameterValue, parameterType) => {
    const concretizeParameterPayload = await ConcretePatternService.postConcretiseParameter(
      URL,
      parameterValue,
      parameterType
    );
    if (concretizeParameterPayload.success) {
      context.commit("registerErrorMessage", "");
      context.commit("registerSuccessMessage", concretizeParameterPayload.data);
      
    } else {
      context.commit(
        "registerEroorMessage",
        concretizeParameterPayload.data.message
      );
    }
  },

  onUserParameterValueChoice: (context, payload) => {
    context.commit("registerParameterValue", payload);
  },

  onUserParameterTypeChoice: (context, payload) => {
    context.commit("registerParameterType", payload);
  },
};

export default actions;
