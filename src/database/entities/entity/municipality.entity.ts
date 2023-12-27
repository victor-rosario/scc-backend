import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { Base } from "../base/basic.base";
import { ProvincesEntity } from "./province.entity";
import { UserAddressStreetEntity } from "./user-address-street.entity";

@Entity({ name: 'municipalities' })
export class MunicipalitiesEntity extends Base {
    @Column()
    name: string

    @Column()
    slug: string

    @Column()
    provinceId: number

    @ManyToOne(() => (ProvincesEntity), (province) => province.municipalities)
    @JoinColumn({ name: 'provinceId', referencedColumnName: 'id' })
    province: ProvincesEntity;

    @OneToMany(() => (UserAddressStreetEntity), (x) => x.municipality)
    userAddressStreets: UserAddressStreetEntity[];
}