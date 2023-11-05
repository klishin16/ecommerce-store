import axios, { AxiosInstance } from "axios";
import { BACKEND_URL } from "@/constants";
import { IDevice, IPagination, IPaginationResponseData } from "@ecommerce-store/common";
import qs from "qs";

export abstract class BaseApiService<T> {
  protected axiosInstance: AxiosInstance;
  protected constructor(protected apiPrefix: string) {
    this.axiosInstance = axios.create({
      baseURL: BACKEND_URL
    });
    this.axiosInstance.defaults.headers.common['Content-Type'] = 'application/json;charset=utf-8';
    this.axiosInstance.interceptors.response.use(
      (response) => response.data
    )
  }

  public fetchAll = () => {
    return this.axiosInstance.get<T[]>(this.apiPrefix);
  }

  public fetchWithPagination = (pagination: IPagination) => {
    return this.axiosInstance.get<IPaginationResponseData<T>>(this.apiPrefix + '/with-pagination?' + qs.stringify(pagination))
  }

  public fetchOne = (item_id: number) => {
    return this.axiosInstance.get<T>(this.apiPrefix + '/' + item_id)
  }

  public create = <CreateDto>(token: string, payload: CreateDto) => {
    return this.axiosInstance.post<T[]>(this.apiPrefix, payload, {
      headers: {
        'Authorization': `Bearer ${ token }`
      }
    })
  }

  public update = <T extends { id: number }>(token: string, payload: T) => {
    return this.axiosInstance.patch<IDevice>(this.apiPrefix + '/' + payload.id, payload, {
      headers: {
        'Authorization': `Bearer ${ token }`
      }
    })
  }

  public remove = (token: string, id: number) => {
    return this.axiosInstance.delete(this.apiPrefix + '/' + id, {
      headers: {
        'Authorization': `Bearer ${ token }`
      }
    })
  }
}
