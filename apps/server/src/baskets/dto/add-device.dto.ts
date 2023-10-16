import {ApiProperty} from "@nestjs/swagger";
import {IsNumber} from "class-validator";

export class AddDeviceDto {
    @ApiProperty({example: '1', description: 'Id товара'})
    @IsNumber({}, {message: "DeviceId должно быть числом"})
    readonly deviceId: number;

    @ApiProperty({example: '4', description: 'Id корзины'})
    @IsNumber({}, {message: "BasketId должно быть числом"})
    readonly basketId: number;

    @IsNumber()
    readonly amount: number;
}