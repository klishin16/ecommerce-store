import { IsNumber } from "class-validator";

export class CreateDeviceDto {
    name: string;
    price: number;
    @IsNumber()
    availability: number;
    sale?: number;
    image_url: string;
}
