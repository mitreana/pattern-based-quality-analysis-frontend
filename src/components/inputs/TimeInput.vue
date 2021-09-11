<template>
  <div class="date-container position-relative">
    <input
      type="text"
      readonly
      :style="{ cursor: 'pointer' }"
      class="vc-input form-control"
      placeholder="Select a time"
      @click="toggleInput"
      :value="isoDate"
    />
  </div>
  <DatePicker
    mode="time"
    class="w-47 mt-2 position-absolute"
    :style="{ left: '22%', zIndex: 2000 }"
    v-if="displayInput"
    v-model="selectedTime"
  />
</template>

<script>
import moment from "moment";

export default {
  data: () => {
    return {
      defaultDate: new Date(),
      displayInput: false,
      selectedTime: new Date(),
    };
  },
  computed: {
    isoDate() {
      if (this.selectedTime) {
        return moment(this.selectedTime).format("hh:mm:ss");
      } else {
        return "";
      }
    },
  },

  methods: {
    toggleInput() {
      this.displayInput = !this.displayInput;
    },
  },
};
</script>
