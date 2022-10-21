<template>
  <div class="date-time-container position-relative">
    <el-date-picker
      v-model="selectedDateTime"
      type="datetime"
      placeholder="Select date and time"
      @change="onValueChange"
      class="w-100"
    >
    </el-date-picker>
  </div>
</template>

<script>
import moment from "moment";
const isoDateTimeFormat = "YYYY:MM:DD[T]HH:MM:SS";

export default {
  props: ["value", "change"],
  data() {
    return {
      selectedDateTime: this.value ? new Date(this.value) : null,
    };
  },
  methods: {
    onValueChange(value) {
      const dateTime = moment(value).format();
      this.change(dateTime.split("+")[0]);
    },
  },
};
</script>
