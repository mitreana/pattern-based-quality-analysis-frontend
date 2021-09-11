<template>
  <div
    class="parameter-container d-flex py-2 justify-content-center"
    v-if="
      concretePatternParameters &&
        Object.keys(concretePatternParameters).length > 0
    "
  >
    <div class="col-1 align-self-center">
      <h5>{{ concretePatternParameters[fragment.URL].id }} :</h5>
    </div>
    <div class="value-container col-6 px-2">
      <SelectInput
        v-if="
          concretePatternParameters[fragment.URL].type === 'TextList' ||
            concretePatternParameters[fragment.URL].type === 'Enumeration'
        "
        :options="fragment.Options"
        :value="concretePatternParameters[fragment.URL].value"
        :change="(value) => onValueChange(value, fragment.URL)"
      />
      <TextInput
        v-if="concretePatternParameters[fragment.URL].type === 'Text'"
        :value="concretePatternParameters[fragment.URL].value"
        :change="(value) => onValueChange(value, fragment.URL)"
      />
      <NumberInput
        v-if="concretePatternParameters[fragment.URL].type === 'Number'"
        :value="concretePatternParameters[fragment.URL].value"
        :change="(value) => onValueChange(value, fragment.URL)"
      />
      <DateTimeInput
        v-if="concretePatternParameters[fragment.URL].type === 'DateTime'"
      />
      <DateInput
        v-if="concretePatternParameters[fragment.URL].type === 'Date'"
      />
      <TimeInput
        v-if="concretePatternParameters[fragment.URL].type === 'Time'"
      />
    </div>
    <div class="type-container col-2 px-2">
      <SelectInput
        :options="Object.values(types)"
        :value="concretePatternParameters[fragment.URL].type"
        :disabled="!fragment.TypeModifiable"
        :change="onTypeChange"
      ></SelectInput>
    </div>
    <div class="button-container">
      <button
        :class="concretised ? 'btn btn-success' : 'btn btn-primary'"
        :disabled="
          (concretePatternParameters[fragment.URL].value.length === 0 &&
            !userValue) ||
            (userValue && userValue.length === 0) ||
            concretised
        "
        @click="onConcretiseParameter"
      >
        {{ concretised ? "Done" : "Add" }}
      </button>
    </div>
  </div>
</template>

<script>
import TextInput from "./inputs/TextInput.vue";
import NumberInput from "./inputs/NumberInput.vue";
import SelectInput from "./inputs/SelectInput.vue";
import DateTimeInput from "./inputs/DateTimeInput.vue";
import DateInput from "./inputs/DateInput.vue";
import TimeInput from "./inputs/TimeInput.vue";
import ConcretePatternService from "../services/ConcretePatternService";
import { mapState, mapActions } from "vuex";

export default {
  props: ["fragment"],
  components: {
    TextInput,
    NumberInput,
    SelectInput,
    DateTimeInput,
    DateInput,
    TimeInput,
  },
  data: () => {
    return {
      types: [
        "Text",
        "TextList",
        "Enumeration",
        "Number",
        "Date",
        "Time",
        "DateTime",
      ],
      userValue: null,
      userType: null,
      concretised: false,
    };
  },
  computed: mapState({
    concretePatternParameters: (state) => {
      return state.concretePatternParameters;
    },
  }),
  methods: {
    ...mapActions(["onUserParameterValueChoice", "onUserParameterTypeChoice"]),
    onValueChange: function(value, url) {
      this.userValue = value;
      this.onUserParameterValueChoice({ value, url });
    },
    onTypeChange: function(type) {
      this.userType = type;
    },
    onConcretiseParameter: async function() {
      const concretiseParameterPayload = await ConcretePatternService.postConcretiseParameter(
        this.fragment.URL,
        this.userValue ? this.userValue : this.fragment.Value,
        this.userType ? this.userType : this.fragment.Type
      );

      if (concretiseParameterPayload) {
        this.concretised = true;
      }
    },
  },
};
</script>
