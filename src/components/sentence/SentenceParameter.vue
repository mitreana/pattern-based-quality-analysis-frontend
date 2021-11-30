<template>
  <div class="parameter-container d-flex py-2 justify-content-center">
    <div class="value-container px-2">
      <SelectInput
        v-if="activeParameter.Type === 'TextList'"
        :options="activeParameter.Options"
        :value="activeParameter.Value"
        :change="(value) => onValueChange(value)"
        ref="input"
      />
      <SelectInput
        v-if="activeParameter.Type === 'Enumeration'"
        :options="activeParameter.Options"
        :value="activeParameter.Value"
        :change="(value) => onValueChange(value)"
        ref="input"
      />
      <TextInput
        v-if="
          activeParameter.Type === 'Text' || activeParameter.Type === 'Untyped'
        "
        :value="activeParameter.Value"
        :change="(value) => onValueChange(value)"
        ref="input"
      />
      <NumberInput
        v-if="activeParameter.Type === 'Number'"
        :value="activeParameter.Value"
        :change="(value) => onValueChange(value)"
        ref="input"
      />
      <DateTimeInput
        v-if="activeParameter.Type === 'DateTime'"
        :change="(value) => onValueChange(value)"
        :value="activeParameter.Value"
        ref="input"
      />
      <DateInput
        v-if="activeParameter.Type === 'Date'"
        :change="(value) => onValueChange(value)"
        :value="activeParameter.Value"
        ref="input"
      />
      <TimeInput
        v-if="activeParameter.Type === 'Time'"
        :change="(value) => onValueChange(value)"
        :value="activeParameter.Value"
        ref="input"
      />
      <CheckboxInput
        v-if="activeParameter.Type === 'Boolean'"
        :change="(value) => onBooleanChange(value)"
        :value="activeParameter.Value"
        ref="input"
      />
    </div>
    <div class="type-container col-2 px-2">
      <SelectInput
        v-if="activeParameter.Type === 'Enumeration'"
        :options="Object.values(types)"
        :value="
          activeParameter.Type === 'Untyped' ? 'Text' : activeParameter.Type
        "
        :disabled="!activeParameter.TypeModifiable"
        :change="onTypeChange"
      ></SelectInput>
      <SelectInput
        v-if="activeParameter.Type === 'DateTime'"
        :options="Object.values(types)"
        :value="
          activeParameter.Type === 'Untyped' ? 'Text' : activeParameter.Type
        "
        :disabled="!activeParameter.TypeModifiable"
        :change="onTypeChange"
      ></SelectInput>
      <SelectInput
        v-if="activeParameter.Type === 'TextList'"
        :options="Object.values(types)"
        :value="
          activeParameter.Type === 'Untyped' ? 'Text' : activeParameter.Type
        "
        :disabled="!activeParameter.TypeModifiable"
        :change="onTypeChange"
      ></SelectInput>
      <SelectInput
        v-if="activeParameter.Type === 'Date'"
        :options="Object.values(types)"
        :value="
          activeParameter.Type === 'Untyped' ? 'Text' : activeParameter.Type
        "
        :disabled="!activeParameter.TypeModifiable"
        :change="onTypeChange"
      ></SelectInput>
      <SelectInput
        v-if="activeParameter.Type === 'Time'"
        :options="Object.values(types)"
        :value="
          activeParameter.Type === 'Untyped' ? 'Text' : activeParameter.Type
        "
        :disabled="!activeParameter.TypeModifiable"
        :change="onTypeChange"
      ></SelectInput>
      <SelectInput
        v-if="
          activeParameter.Type === 'Text' || activeParameter.Type === 'Untyped'
        "
        :options="Object.values(types)"
        :value="
          activeParameter.Type === 'Untyped' ? 'Text' : activeParameter.Type
        "
        :disabled="!activeParameter.TypeModifiable"
        :change="onTypeChange"
      ></SelectInput>
      <SelectInput
        v-if="activeParameter.Type === 'Number'"
        :options="Object.values(types)"
        :value="
          activeParameter.Type === 'Untyped' ? 'Text' : activeParameter.Type
        "
        :disabled="!activeParameter.TypeModifiable"
        :change="onTypeChange"
      ></SelectInput>
      <SelectInput
        v-if="activeParameter.Type === 'Boolean'"
        :options="Object.values(types)"
        :value="
          activeParameter.Type === 'Untyped' ? 'Text' : activeParameter.Type
        "
        :disabled="!activeParameter.TypeModifiable"
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
        :disabled="!activeParameter.Value"
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
  props: ["activeParameter"],
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
      fragments: (state) => {
        return state.concretePatternTextObject.Fragments;
      },
      concretePatternTextObject: (state) => {
        return state.concretePatternTextObject;
      },
    }),
  },
  data() {
    return {
      types: ["Text", "Number", "Date", "Time", "DateTime", "Boolean"],
      concretised: false,
      added: false,
    };
  },
  methods: {
    ...mapActions(["onFragmentValueChange", "onFragmentTypeChange"]),
    onValueChange: function(value) {
      this.onFragmentValueChange({
        fragmentName: this.activeParameter.Name,
        fragmentValue: value,
      });
      this.activeParameter.Value = value;
    },
    onBooleanChange: function(value) {
      this.onFragmentValueChange({
        fragmentName: this.activeParameter.Name,
        fragmentValue: value,
      });
      this.activeParameter.Value = Boolean(value);
    },
    onTypeChange: function(type) {
      this.onFragmentTypeChange({
        fragmentName: this.activeParameter.Name,
        fragmentType: type,
      });
      this.activeParameter.Type = type;
    },
    async onConcretiseParameter() {
      this.added = true;
      const concretiseParameterPayload = await Promise.all(
        this.activeParameter.URLs.map((url) =>
          ConcretePatternService.postConcretiseParameter(
            url,
            this.activeParameter.Value
              ? this.activeParameter.Value
              : this.activeParameter.Value,
            this.activeParameter.Type === "Untyped"
              ? "Text"
              : this.activeParameter.Type
          )
        )
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
    openNotification(title, message, type) {
      this.$notify({
        title,
        message,
        type,
        position: "bottom-right",
      });
    },
  },
  created() {
    console.log("This active parameter", this.activeParameter);
  },
  mounted(){
    console.log("mounted entered")
  },
  unmounted(){
console.log("unmounted entered")
  }
  // methods: {
  //   ...mapActions(["onUserParameterValueChoice", "onUserParameterTypeChoice"]),
  //   openNotification(title, message, type) {
  //     this.$notify({
  //       title,
  //       message,
  //       type,
  //       position: "bottom-right",
  //     });
  //   },
  //   onValueChange: function(value, url) {
  //     this.activeParameter.Value = String(value);
  //     this.onUserParameterValueChoice({ value: String(value), url });
  //   },
  //   onBooleanChange: function(value, url) {
  //     this.activeParameter.Value = Boolean(value);
  //     this.onUserParameterValueChoice({ value: Boolean(value), url });
  //   },
  //   onTypeChange: function(type) {
  //     this.activeParameter.Type = type;
  //   },
  //   onConcretiseParameter: async function() {
  //     const concretiseParameterPayload = await ConcretePatternService.postConcretiseParameter(
  //       this.fragment.URL,
  //       this.activeParameter.Value ? this.activeParameter.Value : this.fragment.Value,
  //       this.activeParameter.Type ? this.activeParameter.Type : this.fragment.Type
  //     );

  //     if (concretiseParameterPayload) {
  //       this.concretised = true;
  //     }

  //     if (this.concretised) {
  //       this.openNotification(
  //         "Success message",
  //         "New Paremeter value was successfully added!",
  //         "success"
  //       );
  //     }
  //   },
  // },
  // mounted() {
  //   this.added = false;
  // },
  // unmounted() {
  //   const defaultValue =
  //     this.concretePatternParameters[this.fragment.URL] &&
  //     this.concretePatternParameters[this.fragment.URL].defaultValue &&
  //     this.concretePatternParameters[this.fragment.URL].defaultValue;

  //   const URL = this.fragment && this.fragment.URL && this.fragment.URL;

  //   const defaultType =
  //     this.concretePatternParameters[this.fragment.URL] &&
  //     this.concretePatternParameters[this.fragment.URL].defaultType &&
  //     this.concretePatternParameters[this.fragment.URL].defaultType;

  //   if (!this.added) {
  //     this.onValueChange(defaultValue, URL);
  //     this.onTypeChange(defaultType, URL);
  //   }
  // },
  // created() {
  //   console.log("This is the fragment", this.fragment);
  // },
};
</script>
