<template>
  <div class="demo-date-picker">
    <div class="block">
      <el-date-picker
        :value="isoDate"
        v-model="selectedDate"
        type="text"
        placeholder="Sel,ect a date"
        @change="onDateChange"
        class="w-100"
      >
      </el-date-picker>
    </div>
  </div>
</template>

<script>
import moment from "moment";

const isoDateFormat = "YYYY-MM-DD";

export default {
  props: ["value", "change"],
  data() {
    return {
      selectedDate: this.value ? this.value : null,
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
    onDateChange(value) {
      const isoDate = moment(value).format(isoDateFormat);
      this.change(isoDate);
    },
  },
};
</script>
