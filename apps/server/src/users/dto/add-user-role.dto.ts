import {ApiProperty} from "@nestjs/swagger";
import {IsNumber, IsString} from "class-validator";

export class AddUserRoleDto {
    @ApiProperty({example: 'ADMIN', description: 'Роль'})
    @IsString({message: "Должно быть строкой"})
    readonly value: string;
    @IsNumber({}, {message: "Должно быть числом"})
    readonly userId: number;
}