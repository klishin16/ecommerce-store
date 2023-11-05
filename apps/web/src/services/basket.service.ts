import { IAddBasketDeviceDto, IBasket, IPurchase, IRemoveBasketDeviceDto } from "@ecommerce-store/common";
import { BaseApiService } from "@/services/base-api.service";


class BasketApiService extends BaseApiService<IBasket> {
    constructor() {
        super('baskets');
    }

    public addDevice = async (token: string, payload: IAddBasketDeviceDto): Promise<IPurchase> => {
        return this.axiosInstance.post<IPurchase>(this.apiPrefix + '/add-device', payload, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
    }

    public removeDevice = async (token: string, payload: IRemoveBasketDeviceDto) => {
        return this.axiosInstance.post( this.apiPrefix + '/remove-device', payload, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
    }
}

export const BasketService = new BasketApiService()
