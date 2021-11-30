const finalizedPatternsMutations = {
  registerFinalizedPatterns:(state, finalizedPatterns)=>{
    state.finalizedPatterns = [...finalizedPatterns]
  },
};
export default finalizedPatternsMutations;
