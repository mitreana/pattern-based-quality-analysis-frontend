<template>
  <div class="date-time-container position-relative">
    <input
      type="text"
      readonly
      :style="{ cursor: 'pointer' }"
      class="vc-input form-control"
      placeholder="Select a datetime"
      @click="toggleInput"
      :value="isoDate"
    />
  </div>
  <DatePicker
    mode="dateTime"
    class="w-47 mt-2 position-absolute"
    :style="{ left: '22%', zIndex: 2000 }"
    v-if="displayInput"
    v-model="selectedDateTime"
  />
</template>

<script>
export default {
  data: () => {
    return {
      defaultDate: new Date(),
      displayInput: false,
      selectedDateTime: null,
    };
  },
  computed: {
    isoDate() {
      if (this.selectedDateTime) {
        return new Date(this.selectedDateTime).toISOString();
      } else {
        return "";
      }
    },
  },

  methods: {
    toggleInput() {
      this.displayInput = !this.displayInput;
    },
    onChange(event) {
      console.log("Value", event.target.timestamp);
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
