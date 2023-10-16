import { IDevice } from "./device.model";

export interface IBrand {
    id: number;
    name: string;
    description: string;
    devices: IDevice[];
}

export interface ICreateBrandDto {
    name: string;
    description: string;
}

export interface IUpdateBrandDto extends ICreateBrandDto {
    id: number;
}
