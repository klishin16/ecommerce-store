import axios from "axios";
import { BACKEND_URL } from "@/constants";
import { IStatistics } from "@ecommerce-store/common";


const axiosInstance = axios.create({
    baseURL: BACKEND_URL
});
axiosInstance.defaults.headers.common['Content-Type'] = 'application/json;charset=utf-8';
axiosInstance.interceptors.response.use(
    (response) => response.data
)

const fetch = () => {
    return axiosInstance.get<IStatistics>('statistics', {
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        }
    });
}

export const StatisticsService = {
    fetch
}
