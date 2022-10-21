import api from "./axios";
import axios from "axios";

class ConcretePatternService {
  baseUrl;

  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async getConcretePatterns() {
    try {
      const payload = await api.get(this.baseUrl + "/concrete-patterns");
      return {
        success: true,
        data: payload.data,
      };
    } catch (err) {
      return {
        success: false,
        data: err,
      };
    }
  }

  async getConcretePatternText(concretePatternName) {
    try {
      const payload = await api.get(
        this.baseUrl + `/concrete-patterns` + `/text/${concretePatternName}`
      );
      return {
        success: true,
        data: payload.data,
      };
    } catch (err) {
      return {
        success: false,
        data: err,
      };
    }
  }

  async postConcretiseParameter(URL, parameterValue, parameterType) {
    try {
      const payload = await api.post(
        this.baseUrl +
          `${URL}?value=${parameterValue}${
            parameterType ? "&type=" + parameterType : ""
          }`,
        {
          Headers: { Origin: "*" },
        }
      );
      return {
        success: true,
        data: payload.data,
      };
    } catch (err) {
      return {
        success: false,
        data: err,
      };
    }
  }
  //http://localhost:8081/qualitypatternmodel/concrete-patterns/deletion/lo

  async postDelete(concretePatternName) {
    try {
      const payload = await api.delete(
        this.baseUrl +
          `/concrete-patterns` +
          `/deletion/${concretePatternName}`,
        {
          Headers: { Origin: "*" },
        }
      );
      return {
        success: true,
        data: payload.data,
      };
    } catch (err) {
      return {
        success: false,
        data: err,
      };
    }
  }

  //http://localhost:8081/qualitypatternmodel/concrete-patterns/finalization/card_concrete

  async postFinalizeConcretisation(concretePatternName) {
    try {
      const payload = await axios.post(
        this.baseUrl + `/concrete-patterns/finalization/${concretePatternName}`,
        { Headers: { Origin: "*" } }
      );
      return {
        success: true,
        data: payload.data,
      };
    } catch (err) {
      return {
        success: false,
        data: err,
      };
    }
  }

  // http://localhost:8081/qualitypatternmodel/parameter-explanations

  async getParameterExplanations() {
    try {
      const payload = await api.get(this.baseUrl + `/parameter-explanations`);
      return {
        success: true,
        data: payload.data,
      };
    } catch (err) {
      return {
        success: false,
        data: err,
      };
    }
  }

  // /concrete-patterns/schema-validation/card_concrete_finalized
  async postValidatePatternAgainstSchema(patternName) {
    try {
      const payload = await axios.get(
        this.baseUrl + `/concrete-patterns/schema-validation/${patternName}`,
        { Headers: { Origin: "*" } }
      );
      return {
        success: true,
        data: payload.data,
      };
    } catch (err) {
      return {
        success: false,
        data: err,
      };
    }
  }
  //http://localhost:8081/qualitypatternmodel/concrete-patterns/description/1?description=somethingnew
  async postPatternDescription(body) {
    try {
      const payload = await api.post(
        this.baseUrl +
          `/concrete-patterns/description/${body.concretePatternName}?description=${body.description}`,
        { Headers: { Origin: "*" } }
      );
      return {
        success: true,
        data: payload.data,
      };
    } catch (err) {
      return {
        success: false,
        data: err,
      };
    }
  }

  async callConcretePatternParameterExplanations() {
    try {
      const payload = await api.get(this.baseUrl + "/parameter-explanations", {
        Headers: { Origin: "*" },
      });

      return {
        success: true,
        data: payload.data,
      };
    } catch (err) {
      return {
        success: false,
        data: err,
      };
    }
  }
}

export default new ConcretePatternService(
  "http://localhost:8081/qualitypatternmodel"
);
