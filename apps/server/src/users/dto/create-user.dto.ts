import {IsEmail, IsStrongPassword} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class CreateUserDto {
    @ApiProperty({example: 'user@mail.ru', description: 'Email'})
    @IsEmail()
    email: string;

    @ApiProperty({ description: 'Password' })
    @IsStrongPassword()
    password: string;
}
