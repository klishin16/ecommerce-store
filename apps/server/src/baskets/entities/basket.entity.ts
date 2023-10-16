import { Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../users/entities/user.entity";
import { Purchase } from "./purchase.entity";
import { IBasket } from "@ecommerce-store/common";

@Entity()
export class Basket implements IBasket {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => User)
    user: User

    @OneToMany(() => Purchase, purchase => purchase.basket)
    purchases: Purchase[];
}
