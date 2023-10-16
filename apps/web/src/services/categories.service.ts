import axios from "axios";
import { BACKEND_URL } from "@/constants";
import { ICategory, ICreateCategoryDto } from "@ecommerce-store/common";

const fetchAll = async () => {
    return axios.get<ICategory[]>(BACKEND_URL + 'categories', {
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        }
    }).then(response => response.data)
}

const create = async (token: string, payload: ICreateCategoryDto) => {
    return axios.post<ICategory[]>(BACKEND_URL + 'categories',  payload, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json;charset=utf-8'
        }
    }).then(response => response.data)
}

export const CategoriesService = {
    fetchAll,
    create
}
