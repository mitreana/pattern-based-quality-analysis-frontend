<template>
  <div
    class="parameter-container d-flex py-2 justify-content-center"
    v-if="
      concretePatternParameters && Object.keys(concretePatternParameters).length
    "
  >
    <div class="value-container px-2">
      <SelectInput
        v-if="userType === 'TextList'"
        :options="fragment.Options"
        :value="
          concretePatternParameters[fragment.URL] &&
            concretePatternParameters[fragment.URL].value &&
            concretePatternParameters[fragment.URL].value
        "
        :change="(value) => onValueChange(value, fragment.URL)"
      />
      <SelectInput
        v-if="userType === 'Enumeration'"
        :options="fragment.Options"
        :value="
          concretePatternParameters[fragment.URL] &&
            concretePatternParameters[fragment.URL].value &&
            concretePatternParameters[fragment.URL].value
        "
        :change="(value) => onValueChange(value, fragment.URL)"
      />
      <TextInput
        v-if="userType === 'Text'"
        :value="
          concretePatternParameters[fragment.URL] &&
            concretePatternParameters[fragment.URL].value &&
            concretePatternParameters[fragment.URL].value
        "
        :change="(value) => onValueChange(value, fragment.URL)"
      />
      <NumberInput
        v-if="userType === 'Number'"
        :value="concretePatternParameters[fragment.URL].value"
        :change="(value) => onValueChange(value, fragment.URL)"
      />
      <DateTimeInput
        v-if="userType === 'DateTime'"
        :change="(value) => onValueChange(value, fragment.URL)"
        :value="
          concretePatternParameters[fragment.URL] &&
            concretePatternParameters[fragment.URL].value &&
            concretePatternParameters[fragment.URL].value
        "
      />
      <DateInput
        v-if="userType === 'Date'"
        :change="(value) => onValueChange(value, fragment.URL)"
        :value="
          concretePatternParameters[fragment.URL] &&
            concretePatternParameters[fragment.URL].value &&
            concretePatternParameters[fragment.URL].value
        "
      />
      <TimeInput
        v-if="userType === 'Time'"
        :change="(value) => onValueChange(value, fragment.URL)"
        :value="
          concretePatternParameters[fragment.URL] &&
            concretePatternParameters[fragment.URL].value &&
            concretePatternParameters[fragment.URL].value
        "
      />
      <CheckboxInput
        v-if="userType === 'Boolean'"
        :change="(value) => onValueChange(value, fragment.URL)"
        :value="
          concretePatternParameters[fragment.URL] &&
            concretePatternParameters[fragment.URL].value &&
            concretePatternParameters[fragment.URL].value
        "
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
      <el-button
        type="primary"
        @click="
          () => {
            onConcretiseParameter();
            added = true;
          }
        "
        plain
        :disabled="!userValue"
      >
        Add
      </el-button>
    </div>
  </div>
</template>

<script>
import TextInput from "../inputs/TextInput.vue";
import NumberInput from "../inputs/NumberInput.vue";
import SelectInput from "../inputs/SelectInput.vue";
import DateTimeInput from "../inputs/DateTimeInput.vue";
import DateInput from "../inputs/DateInput.vue";
import TimeInput from "../inputs/TimeInput.vue";
import CheckboxInput from "../inputs/CheckboxInput.vue";
import ConcretePatternService from "../../services/ConcretePatternService";
import { mapState, mapActions } from "vuex";

export default {
  props: ["fragment", "type"],
  components: {
    TextInput,
    NumberInput,
    SelectInput,
    DateTimeInput,
    DateInput,
    TimeInput,
    CheckboxInput,
  },
  computed: {
    ...mapState({
      concretePatternParameters: (state) => {
        return state.concretePatternParameters;
      },
    }),
    transformedUserType() {
      return this.concretePatternParameters[this.fragment.URL] &&
        this.concretePatternParameters[this.fragment.URL].type
        ? this.concretePatternParameters[this.fragment.URL].type
        : null;
    },
  },
  data() {
    return {
      types: ["Text", "Number", "Date", "Time", "DateTime", "Boolean"],
      userValue: null,
      userType: this.type,
      concretised: false,
      added: false,
    };
  },
  methods: {
    ...mapActions(["onUserParameterValueChoice", "onUserParameterTypeChoice"]),
    openNotification(title, message, type) {
      this.$notify({
        title,
        message,
        type,
        position: "bottom-right",
      });
    },
    onValueChange: function(value, url) {
      this.userValue = String(value);
      this.onUserParameterValueChoice({ value: String(value), url });
    },
    onBooleanChange: function(value, url) {
      this.userValue = Boolean(value);
      this.onUserParameterValueChoice({ value: Boolean(value), url });
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

      if (this.concretised) {
        this.openNotification(
          "Success message",
          "New Paremeter value was successfully added!",
          "success"
        );
      }
    },
  },
  mounted() {
    this.added = false;
  },
  unmounted() {
    const defaultValue =
      this.concretePatternParameters[this.fragment.URL] &&
      this.concretePatternParameters[this.fragment.URL].defaultValue &&
      this.concretePatternParameters[this.fragment.URL].defaultValue;

    const URL = this.fragment && this.fragment.URL && this.fragment.URL;

    const defaultType =
      this.concretePatternParameters[this.fragment.URL] &&
      this.concretePatternParameters[this.fragment.URL].defaultType &&
      this.concretePatternParameters[this.fragment.URL].defaultType;

    if (!this.added) {
      this.onValueChange(defaultValue, URL);
      this.onTypeChange(defaultType, URL);
    }
  },
  
};
</script>
