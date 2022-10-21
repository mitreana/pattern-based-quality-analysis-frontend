<template>
    <div>
        <div class="top">
            <el-button class="goBack" @click="goBack">Go back</el-button>
            <h5>Results</h5>
        </div>
        <el-alert
                  title="Coppied!"
                  width="50"
                  type="success"
                  center
                  show-icon
                  v-if="copied"
                  >

        </el-alert>
        <div
             class="card"
             v-for="item in applyPatternsResponse"
             :key="item"
             
             >
            
            <el-scrollbar height="300px">
                <el-button
                           v-if="item.Results.length > 0"
                           size="small"
                           class="copyButton"
                           @click="copy(item.Results)"
                           type="primary"
                           plain
                           >Copy to Clipboard</el-button
        >


        <div >
            <p class="p">Result for Finalized Pattern " {{ item.Pattern }} " :</p>
            <p class="p">{{ item.Description }}</p>
            <!-- <p class="p">Result :</p> -->
            <p class="p" id="result" ref="result" v-if="item.Results.length > 0">
                {{ breakText(item.Results) }}
            </p>
            <p class="pErrors" v-if="item.Results.length == 0">No Results found</p>
        </div>
            </el-scrollbar>
            
        </div>
    </div>
</template>

<script>
    import { mapActions, mapState } from "vuex";
    export default {
        data() {
            return {
                copied: false,
            };
        },
        computed: mapState({
            applyPatternsResponse: (state) => {
                return state.applyPatternsResponse;
            },
        }),
        created() {
            if (!this.applyPatternsResponse) {
                window.location.replace("/databases");
            }
        },

        methods: {
            ...mapActions(["onResetApplyPatternsResponse"]),
            goBack() {
                this.$router.back();
                this.onResetApplyPatternsResponse();
            },
            copy(results) {
                navigator.clipboard
                    .writeText(results)
                    .then(() => {
                        this.copied = true;
                    })
                    .catch((err) => {
                        console.error("Error in copying text: ", err);
                        this.copied = false;
                    });
                this.copied = false;
            },
            breakText(text) {
                return text.toString().replace("\r\n", "<br>");
            },
        },
    };
</script>

<style scoped>
    .card {
        width: 90%;
        min-height: 10rem;
        margin-bottom: 1%;
    }
    .p {
        text-align: left;
        margin-top: 2%;
        margin-left: 2%;
    }
    .top {
        display: flex;
    }
    .goBack {
        margin-right: 34%;
        margin-left: 5%;
        margin-bottom: 1%;
    }
    .pErrors {
        text-align: left;
        margin-top: 0%;
        margin-left: 2%;
        opacity: 0.5;
    }
    .copyButton {
        margin-bottom: 0%;
        margin-top: 1%;
        margin-left: 85%;
        position: sticky;
        right: 40px;
        top: 0;
    }
    .header {
        display: flexbox;
    }
    #result {
        white-space: pre-line;
    }
    #toCopy {
        position: relative;
    }
    #el-alert {
        margin-bottom: 2%;
    }
</style>