import axios from "axios";
import { BACKEND_URL } from "@/constants";
import { IDevicesFilters } from "@/app/components/devices/devices-filter";
import { IDevice, IDeviceUpdateDto } from "@ecommerce-store/common";

const fetchAll = async () => {
    return axios.get<IDevice[]>(BACKEND_URL + 'devices', {
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        }
    }).then(response => response.data)
}

const fetchWithFilters = async (filters: IDevicesFilters) => {
    return axios.post<IDevice[]>(BACKEND_URL + 'devices/with-filters', filters, {
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        }
    }).then(response => response.data)
}

const fetchOne = async (device_id: number) => {
    return axios.get<IDevice>(BACKEND_URL + 'devices/' + device_id, {
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        }
    }).then(response => response.data)
}

const create = async (token: string, payload: any) => {
    return axios.post<IDevice[]>(BACKEND_URL + 'devices',  payload, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json;charset=utf-8'
        }
    }).then(response => response.data)
}

const update = async (token: string, payload: IDeviceUpdateDto): Promise<IDevice> => {
    return axios.patch<IDevice>(BACKEND_URL + 'devices/' + payload.id, payload, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json;charset=utf-8'
        }
    }).then(response => response.data)
}

const remove = async (token: string, id: number)=> {
    return axios.delete(BACKEND_URL + 'devices/' + id, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json;charset=utf-8'
        }
    })
}

export const DevicesService = {
    fetchAll,
    fetchWithFilters,
    fetchOne,
    create,
    update,
    remove
}
