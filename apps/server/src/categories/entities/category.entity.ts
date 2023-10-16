import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn, Tree, TreeChildren, TreeParent } from "typeorm";
import { Device } from "../../devices/entities/device.entity";
import { ICategory } from "@ecommerce-store/common";

@Entity()
@Tree('closure-table')
export class Category implements ICategory {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @TreeChildren()
    children: Category[];

    @Column({ type: "int", nullable: true })
    parentId: number;

    @TreeParent()
    @JoinColumn({ name: "parentCategoryId" })
    parent: Category;

    @OneToMany(() => Device, (device) => device.category)
    devices: Device[];
}
