import {
    Column,
    Entity,
    JoinColumn,
    ManyToMany,
    ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn
} from "typeorm";
import {Brand} from "../../brands/entities/brand.entity";
import {Category} from "../../categories/entities/category.entity";
import {User} from "../../users/entities/user.entity";
import { Purchase } from "../../baskets/entities/purchase.entity";
import { IDevice } from "@ecommerce-store/common";

@Entity()
export class Device implements IDevice {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ nullable: true })
    description: string;

    @Column()
    price: number;

    @Column()
    sale: number;

    @Column()
    availability: number;

    @Column()
    image_url: string;

    @ManyToMany(() => User)
    users_favorites: User[];

    @Column({ type: "int", nullable: true })
    brandId: number;
    @ManyToOne(() => Brand)
    @JoinColumn({ name: "brandId" })
    brand: Brand;

    @Column({ type: "int", nullable: true })
    categoryId: number;
    @ManyToOne(() => Category)
    @JoinColumn({ name: "categoryId" })
    category: Category;

    @OneToMany(() => Purchase, purchase => purchase.device)
    purchases: Purchase[];
}
