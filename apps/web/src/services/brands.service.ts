import axios from "axios";
import { BACKEND_URL } from "@/constants";
import { IBrand, ICreateBrandDto, IDevice, IDeviceUpdateDto, IUpdateBrandDto } from "@ecommerce-store/common";

const fetchAll = async () => {
    return axios.get<IBrand[]>(BACKEND_URL + 'brands', {
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        }
    }).then(response => response.data)
}

const create = async (token: string, payload: ICreateBrandDto) => {
    return axios.post<IBrand[]>(BACKEND_URL + 'brands',  payload, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json;charset=utf-8'
        }
    }).then(response => response.data)
}


const update = async (token: string, payload: IUpdateBrandDto): Promise<IBrand> => {
    return axios.patch<IBrand>(BACKEND_URL + 'brands/' + payload.id, payload, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json;charset=utf-8'
        }
    }).then(response => response.data)
}

export const BrandsService = {
    fetchAll,
    create,
    update
}
