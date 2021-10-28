<template>
  <div
    class="card"
    :style="{
      width: '80%',
      margin: 'auto',
    }"
    v-if="
      concretePatternTextObject &&
        Object.keys(concretePatternTextObject).length > 0
    "
  >
    <div class="card-body">
      <h3 ref="title" class="card-title">Edit concrete pattern</h3>
      <el-form label-position="left">
        <div id="name">
          <el-form-item
            label="Pattern Name"
            class="d-flex flex-column text-justify"
            v-if="
              concretePatternTextObject.PatternName &&
                concretePatternTextObject.PatternName.length > 0
            "
          >
            <el-tag class="w-100">{{
              concretePatternTextObject.PatternName
            }}</el-tag>
          </el-form-item>
        </div>

        <div>
          <el-form-item
            label="Pattern Text Name"
            class="d-flex flex-column text-justify"
            v-if="
              concretePatternTextObject.PatternTextName &&
                concretePatternTextObject.PatternTextName.length > 0
            "
          >
            <el-tag class="w-100">{{
              concretePatternTextObject.PatternTextName
            }}</el-tag>
          </el-form-item>
        </div>

        <el-form-item label="Sentence" class="d-flex flex-column text-justify">
          <ConcretePatternSentenceContainer
            v-if="
              concretePatternTextObject &&
                concretePatternTextObject.Fragments &&
                concretePatternTextObject.Fragments.length > 0
            "
            :fragments="concretePatternTextObject.Fragments"
          />
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import ConcretePatternSentenceContainer from "../components/containers/ConcretePatternSentenceContainer.vue";

export default {
  components: { ConcretePatternSentenceContainer },
  computed: mapState({
    concretePatternTextObject: (state) => {
      return state.concretePatternTextObject;
    },
  }),
  methods: {
    ...mapActions(["callConcretePatternText"]),
  },
  created() {
    const params = this.$route.params;
    if (
      params &&
      params.concretePatternName &&
      params.concretePatternName.length > 0
    ) {
      this.callConcretePatternText(params.concretePatternName);
    }
  },
};
</script>

<style scoped>
.el-tag {
  text-align: left;
  font-size: 1rem;
}
</style>
