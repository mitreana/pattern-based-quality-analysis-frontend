import axios from "axios";
import axiosRetry from "axios-retry";

const api = axios.create({});
axiosRetry(api, {
    retries: 3,
    retryCondition: (error) => {
        if (error && !error.response) {
            return false;
        }

        if (
            error &&
            error.response &&
            error.response.status &&
            error.response.status === 500
        ) {
            return true;
        }

        return false;
    },
    retryDelay: () => {
        return 1500;
    },
});

export default api;