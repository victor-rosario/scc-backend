import { Column, Entity, OneToMany } from "typeorm";
import { Base } from "../base/basic.base";
import { MunicipalitiesEntity } from "./municipality.entity";
import { UserAddressStreetEntity } from "./user-address-street.entity";

@Entity({ name: 'provinces' })
export class ProvincesEntity extends Base {
    @Column()
    name: string

    @Column()
    slug: string

    @OneToMany(() => (MunicipalitiesEntity), (municipality) => municipality.province)
    municipalities: MunicipalitiesEntity[];

    @OneToMany(() => (UserAddressStreetEntity), (x) => x.province)
    userAddressStreets: UserAddressStreetEntity[];
}