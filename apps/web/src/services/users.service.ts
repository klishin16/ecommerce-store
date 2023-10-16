import axios from "axios";
import { BACKEND_URL } from "@/constants";
import { ICreateUserDto, IUpdateUserDto, IUser } from "@ecommerce-store/common";

const fetchAll = async (token: string) => {
    return axios.get<IUser[]>(BACKEND_URL + 'users', {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json;charset=utf-8'
        }
    }).then(response => response.data)
}

const create = async (token: string, payload: ICreateUserDto) => {
    return axios.post<IUser>(BACKEND_URL + 'users',  payload, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json;charset=utf-8'
        }
    }).then(response => response.data)
}

const update = async (token: string, payload: IUpdateUserDto): Promise<IUser> => {
    return axios.patch<IUser>(BACKEND_URL + 'users/' + payload.id, payload, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json;charset=utf-8'
        }
    }).then(response => response.data)
}

export const UsersService = {
    fetchAll,
    create,
    update
}
