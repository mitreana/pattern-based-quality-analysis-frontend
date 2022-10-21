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
    import _ from "lodash";

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
                timeoutFn: null,
            };
        },
        methods: {
            ...mapActions([
                "onFragmentValueChange",
                "onFragmentTypeChange",
                "concretizeParameter",
                "onParameterStartPosting",
                "onParameterStopPosting",
            ]),
            onValueChange: function (value) {
                if (this.timeoutFn) {
                    clearTimeout(this.timeoutFn);
                }
                this.onParameterStartPosting();

                this.timeoutFn = setTimeout(async () => {
                    this.onFragmentValueChange({
                        fragmentName: this.activeParameter.Name,
                        fragmentValue: value,
                    });
                    await this.onConcretiseParameter();

                    this.activeParameter.Value = value;
                    this.onParameterStopPosting();
                }, 1000);
            },
            onBooleanChange: function (value) {
                if (this.timeoutFn) {
                    clearTimeout(this.timeoutFn);
                }

                this.onParameterStartPosting();

                this.timeoutFn = setTimeout(() => {
                    this.onFragmentValueChange({
                        fragmentName: this.activeParameter.Name,
                        fragmentValue: String(value),
                    });
                    this.activeParameter.Value = Boolean(value);
                    this.onConcretiseParameter();
                    this.onParameterStopPosting();
                }, 500);
            },
            onTypeChange: async function (type) {
                if (type === "Boolean") {
                    await this.onFragmentValueChange({
                        fragmentName: this.activeParameter.Name,
                        fragmentValue: "false",
                    });
                    await this.onFragmentTypeChange({
                        fragmentName: this.activeParameter.Name,
                        fragmentType: type,
                    });
                    this.activeParameter.Type = type;
                    await this.onConcretiseParameter();
                } else {
                    await this.onFragmentTypeChange({
                        fragmentName: this.activeParameter.Name,
                        fragmentType: type,
                    });
                    this.activeParameter.Type = type;
                }
            },
            async onConcretiseParameter() {
                this.added = true;

                let concretiseParameterPayload;

                for await (const activeParameterUrl of this.activeParameter.URLs) {
                    concretiseParameterPayload = await ConcretePatternService.postConcretiseParameter(
                        activeParameterUrl,
                        this.activeParameter.Value
                            ? this.activeParameter.Value
                            : this.activeParameter.Value,
                        this.activeParameter.Type === "Untyped"
                            ? "Text"
                            : this.activeParameter.Type
                    );
                }
                if (concretiseParameterPayload) {
                    this.concretizeParameter(this.activeParameter.Name);
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


    };
</script>