import axios from "axios";

class FinalizedPatternsService {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async getFinalizedPatterns() {
    try {
      const payload =await axios.get(this.baseUrl);
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
  async postApplyPatterns(patternNames){
      try{
          const payload = await axios.post(
            this.baseUrl + "/application?pattern-names=" + patternNames,
            {
              Headers: { Origin: "*" },
            }
          );
        return{
            success: true,
            data:  payload.data
        }

      }catch(err){
        return{
            success:false,
            data: err
        }
      }
  }
}

export default new FinalizedPatternsService(
  "http://localhost:8080/qualitypatternmodel/finalized-patterns"
);