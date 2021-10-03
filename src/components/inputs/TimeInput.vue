<template>
  <div class="date-container position-relative">
    <el-time-picker
      v-model="selectedTime"
      placeholder="Arbitrary time"
      @change="onValueChange"
      class="w-100"
    >
    </el-time-picker>
  </div>
</template>

<script>
import moment from "moment";
const isoTimeFormat = "HH:MM:SS";

export default {
  props: ["value", "change"],
  methods: {
    convertToDate(timestamp) {
      const [hours, minutes, seconds] = timestamp.split(":");
      const baseDate = new Date(1970, 0, 0);
      baseDate.setTime(
        baseDate.getTime() +
          parseInt(hours) * 60 * 60 * 1000 +
          parseInt(minutes) * 60 * 1000 +
          parseInt(seconds) * 1000
      );
      return baseDate;
    },
    onValueChange(value) {
      this.change(moment(value).format(isoTimeFormat));
    },
  },
  data() {
    return {
      selectedTime: this.value ? this.convertToDate(this.value) : null,
    };
  },
  created() {
    this.convertToDate(this.value);
  },
};
</script>
