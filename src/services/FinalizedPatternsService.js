import api from "./axios";

class FinalizedPatternsService {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async getFinalizedPatterns() {
    try {
      const payload = await api.get(this.baseUrl);
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

  //http://localhost:8080/qualitypatternmodel/finalized-patterns
  // /application?pattern-names=card_concrete_finalized
  async postApplyPatterns(patternNames) {
    try {
      const payload = await api.post(
        this.baseUrl +
          "/application?pattern-names=" +
          patternNames.join("&pattern-names="),
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
  //http://localhost:8080/qualitypatternmodel/finalized-patterns/database/neww
  async getFinalizedPatternsOfDatabase(localName) {
    try {
      const payload = await api.get(this.baseUrl + "/database/" + localName);
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

export default new FinalizedPatternsService(
  "http://localhost:8080/qualitypatternmodel/finalized-patterns"
);
