import axios from "axios";
import { BACKEND_URL } from "@/constants";
import {
  ILoginPayload,
  ILoginResponseData,
  IRegisterPayload,
  IRegisterResponseData,
  IUser
} from "@ecommerce-store/common";


const axiosInstance = axios.create({
  baseURL: BACKEND_URL
});
axiosInstance.defaults.headers.common['Content-Type'] = 'application/json;charset=utf-8';
axiosInstance.interceptors.response.use(
  (response) => response.data
)

const register = async (payload: IRegisterPayload): Promise<IRegisterResponseData> => {
  return axiosInstance.post<IRegisterResponseData>('auth/register', payload)
};

const login = async (payload: ILoginPayload): Promise<ILoginResponseData> => {
  return axiosInstance.post<ILoginResponseData>('auth/login', payload)
};

const profile = async (token: string): Promise<IUser> => {
  return axiosInstance.get<IUser>('auth/profile', {
    headers: {
      'Authorization': `Bearer ${ token }`
    }
  })
}

export const AuthService = {
  register,
  login,
  profile
}
