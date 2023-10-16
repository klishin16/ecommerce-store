import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Basket } from "./basket.entity";
import { Device } from "../../devices/entities/device.entity";
import { IPurchase } from "@ecommerce-store/common";

@Entity()
export class Purchase implements IPurchase {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public basketId: number;

    @Column()
    public deviceId: number;

    @Column({ default: 1 })
    public amount: number;

    @ManyToOne(() => Basket, (basket) => basket.purchases)
    public basket: Basket

    @ManyToOne(() => Device, (device) => device.purchases)
    public device: Device
}
