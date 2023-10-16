import axios from "axios";
import { BACKEND_URL } from "@/constants";
import {
    ILoginPayload,
    ILoginResponseData,
    IRegisterPayload,
    IRegisterResponseData,
    IUser
} from "@ecommerce-store/common";

const register = async (payload: IRegisterPayload): Promise<IRegisterResponseData> => {
    return axios.post<IRegisterResponseData>(BACKEND_URL + "auth/register", payload)
        .then((response) => response.data);
};

const login = async (payload: ILoginPayload): Promise<ILoginResponseData> => {
    return axios.post<ILoginResponseData>(BACKEND_URL + "auth/login", payload)
        .then(response => response.data);
};

const profile = async (token: string): Promise<IUser> => {
    return axios.get<IUser>(BACKEND_URL + 'auth/profile', {
        headers: {
            'Authorization': `Bearer ${ token }`,
            'Content-Type': 'application/json;charset=utf-8'
        }
    }).then(response => response.data)
}

export const AuthService = {
    register,
    login,
    profile
}
