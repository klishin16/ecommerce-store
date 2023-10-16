import {ApiProperty} from "@nestjs/swagger";

export class BanUserDto {
    @ApiProperty({ description: 'User id' })
    readonly userId: number;

    @ApiProperty({ description: 'Ban reason' })
    readonly banReason: string;
}