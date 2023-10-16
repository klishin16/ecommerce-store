import axios from "axios";
import { BACKEND_URL } from "@/constants";
import {
    IAddBasketDeviceDto,
    IBasket,
    ICreateBasketDto,
    IPurchase,
    IRemoveBasketDeviceDto
} from "@ecommerce-store/common";


const fetch = async (token: string, basket_id: number): Promise<IBasket> => {
    return axios.get<IBasket>(BACKEND_URL + 'baskets/' + basket_id, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json;charset=utf-8'
        }
    }).then((response) => response.data);
}

const create = async (token: string, payload: ICreateBasketDto): Promise<IBasket> => {
    return axios.post<IBasket>(BACKEND_URL + 'baskets', payload, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json;charset=utf-8'
        }
    }).then((response) => response.data);
}

const addDevice = async (token: string, payload: IAddBasketDeviceDto): Promise<IPurchase> => {
    return axios.post<IPurchase>(BACKEND_URL + 'baskets/add-device', payload, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json;charset=utf-8'
        }
    }).then((response) => response.data);
}

const removeDevice = async (token: string, payload: IRemoveBasketDeviceDto) => {
    return axios.post(BACKEND_URL + 'baskets/remove-device', payload, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json;charset=utf-8'
        }
    }).then((response) => response.data);
}

export const BasketService = {
    fetch,
    create,
    addDevice,
    removeDevice
}
