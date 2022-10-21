<template>
    <div class="date-container position-relative">
        <el-time-picker
                        v-model="selectedTime"
                        placeholder="Select time"
                        @change="onValueChange"
                        class="w-100"
                        >

        </el-time-picker>
    </div>
</template>

<script>
    import moment from "moment";
    const isoTimeFormat = "HH:mm:ss";

    export default {
        props: ["value", "change"],
        methods: {
            convertToDate(timestamp) {
                if (timestamp) {
                    let [hours, minutes, seconds] = timestamp.split(":");
                    if (!hours || !minutes || !seconds) {
                        hours = 12;
                        minutes = 0;
                        seconds = 0;
                    }

                    const baseDate = new Date(1970, 0, 0);
                    baseDate.setTime(
                        baseDate.getTime() +
                        parseInt(hours) * 60 * 60 * 1000 +
                        parseInt(minutes) * 60 * 1000 +
                        parseInt(seconds) * 1000
                    );
                    return baseDate;
                } else {
                    return new Date();
                }
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