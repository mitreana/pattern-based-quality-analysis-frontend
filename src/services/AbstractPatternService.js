import axios from "axios";

class AbstractPatternService {
  baseUrl;

  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async getAbstractPatterns() {
    try {
      const payload = await axios.get(this.baseUrl);

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

  async getAbstractPatternTexts(abstractPattern) {
    try {
      const payload = await axios.get(
        this.baseUrl + `/text-list/${abstractPattern}`
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

  async postConcretePattern(body) {

    try {
      const payload = await axios.post(
        this.baseUrl +
          `/instantiation/` +
          `${body.abstractPattern}` +
          `/` +
          `${body.abstractPatternText}` +
          `?name=` +
          `${body.concretePatternName}`,
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

export default new AbstractPatternService(
  "http://localhost:8080/qualitypatternmodel/abstract-patterns"
);
