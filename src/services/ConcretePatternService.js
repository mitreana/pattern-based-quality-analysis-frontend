import axios from "axios";

class ConcretePatternService {
  baseUrl;

  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async getConcretePatterns() {
    try {
      const payload = await axios.get(this.baseUrl + "/concrete-patterns");
      // Error 401 unauthorized
      return {
        success: true,
        data: payload.data,
      };
    } catch (err) {
      return {
        success: false,
        data: err,
        //what is this err hier?
      };
    }
  }

  async getConcretePatternText(concretePatternName) {
    try {
      const payload = await axios.get(
        this.baseUrl + `/concrete-patterns` + `/text/${concretePatternName}`
      );
      // Error 401 unauthorized
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
      const payload = await axios.post(
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
}

export default new ConcretePatternService(
  "http://localhost:8080/qualitypatternmodel"
);
