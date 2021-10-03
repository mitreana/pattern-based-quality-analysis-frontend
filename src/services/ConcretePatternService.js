import axios from "axios";

class ConcretePatternService {
  baseUrl;

  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async getConcretePatterns() {
    try {
      const payload = await axios.get(this.baseUrl + "/concrete-patterns");
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
      const payload = await axios.get(
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
  //http://localhost:8080/qualitypatternmodel/concrete-patterns/deletion/lo

  async postDelete(concretePatternName) {
    try {
      const payload = await axios.delete(
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

  //http://localhost:8080/qualitypatternmodel/concrete-patterns/finalization/card_concrete

  async postFinalizeConcretisation(concretePatternName) {
    try{
    const payload = await axios.post(
      this.baseUrl + `/concrete-patterns/finalization/${concretePatternName}`,
      { Headers: { Origin: "*" } }
    );
    return {
      success : true,
      data : payload.data
      
    }
    
  }catch(err){
      return{
        success : false,
        data:err
      }
  }
}
}

export default new ConcretePatternService(
  "http://localhost:8080/qualitypatternmodel"
);
