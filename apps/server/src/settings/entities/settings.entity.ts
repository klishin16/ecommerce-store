import { Column, Entity, PrimaryColumn } from "typeorm";
import { ESettingsKinds } from "@ecommerce-store/common";

@Entity()
export class Settings {
    @PrimaryColumn()
    key: string;

    @Column({ type: 'enum', enum: ESettingsKinds })
    kind: ESettingsKinds

    @Column({ type: 'json' })
    value: NonNullable<unknown>
}
