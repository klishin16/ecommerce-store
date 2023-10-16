import { IDevice } from "./device.model";

export interface IPurchase {
    id: number;
    deviceId: number;
    device: IDevice;
    amount: number;
}

export interface IBasket {
    id: number;
    purchases: IPurchase[];
}

export interface ICreateBasketDto {
    userId: number;
}

export interface IUpdateBasketDto extends ICreateBasketDto {
    id: number;
}

export interface IAddBasketDeviceDto {
    deviceId: number;
    basketId: number;
    amount: number;
}

export interface IRemoveBasketDeviceDto {
    basketId: number;
    purchaseId: number;
}
