<template>
  <div class="date-container position-relative">
    <input
      type="text"
      readonly
      :style="{ cursor: 'pointer' }"
      class="vc-input form-control"
      placeholder="Select a date"
      @click="toggleInput"
      :value="isoDate"
    />
  </div>
  <DatePicker
    mode="date"
    class="w-47 mt-2 position-absolute"
    :style="{ left: '22%', zIndex: 2000 }"
    v-if="displayInput"
    v-model="selectedDate"
  />
</template>

<script>
import moment from "moment";

export default {
  data: () => {
    return {
      defaultDate: new Date(),
      displayInput: false,
      selectedDate: new Date(),
    };
  },
  computed: {
    isoDate() {
      if (this.selectedDate) {
        return moment(this.selectedDate).format("YYYY-MM-DD");
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
  created() {
    document.addEventListener("click", (event) => {
      if (event.target && !event.target.classList[0]) {
        
        this.displayInput = false;
      }
      
      if (
        event.target &&
        event.target.classList &&
        event.target.classList[0] &&
        !event.target.classList[0].includes("vc")
      ) {
        this.displayInput = false;
      }
    });
  },
  unmounted() {
    document.removeEventListener("click", () => {});
  },
};
</script>
