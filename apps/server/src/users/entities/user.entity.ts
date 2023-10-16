import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import {ApiProperty} from "@nestjs/swagger";
import {Device} from "../../devices/entities/device.entity";
import {Basket} from "../../baskets/entities/basket.entity";


export enum EUserRoles {
    USER = 'user',
    EDITOR = 'editor',
    ADMIN = 'admin',
}

@Entity()
export class User {
    @ApiProperty({example: '1', description: 'Уникальный идентификатор'})
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({example: 'user@mail.ru', description: 'Почтовый адрес'})
    @Column({ nullable: false })
    email: string;

    @ApiProperty({example: '12345678', description: 'Пароль'})
    @Column()
    password: string;

    @ApiProperty({example: 'true', description: 'Забанен или нет'})
    @Column({ default: false })
    banned: boolean;

    @ApiProperty({example: 'За хулиганство', description: 'Причина блокировки'})
    @Column({ nullable: true })
    banReason: string;

    @Column({
        type: 'enum',
        enum: EUserRoles,
        default: 'user'
    })
    role: EUserRoles;

    @ManyToMany(() => Device)
    @JoinTable()
    favorite_devices: Device[];

    @Column({ type: "int", nullable: true })
    basketId: number;

    @JoinColumn({ name: 'basketId' })
    @OneToOne(() => Basket)
    basket: Basket
}
