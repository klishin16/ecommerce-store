import axios from "axios";
import { BACKEND_URL } from "@/constants";
import { IStatistics } from "@ecommerce-store/common";

const fetch = async () => {
    const response = await axios.get<IStatistics>(BACKEND_URL + 'statistics', {
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        }
    });
    return response.data;
}

export const StatisticsService = {
    fetch
}
