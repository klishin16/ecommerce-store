import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Device} from "../../devices/entities/device.entity";
import { IBrand } from "@ecommerce-store/common";

@Entity()
export class Brand implements IBrand {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @OneToMany(() => Device, (device) => device.brand)
    devices: Device[];
}
