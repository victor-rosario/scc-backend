import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from "typeorm";
import { Base } from "../base/basic.base";
import { UserEntity } from "./user.entity";
import { ProvincesEntity } from "./province.entity";
import { MunicipalitiesEntity } from "./municipality.entity";

@Entity({ name: 'user-address-streets' })
export class UserAddressStreetEntity extends Base {
    @Column()
    address: string;

    @Column()
    noStreet: string;

    @Column({ nullable: true })
    neighborhood: string;

    @Column()
    userId: number

    @Column()
    provinceId: number

    @Column()
    municipalityId: number

    @OneToOne(() => (UserEntity), (user) => user.addressStreet)
    @JoinColumn({
        referencedColumnName: "id",
        name: "userId"
    })
    user: UserEntity;

    @ManyToOne(() => (ProvincesEntity), (province) => province.userAddressStreets)
    @JoinColumn({ name: 'provinceId', referencedColumnName: 'id' })
    province: ProvincesEntity;

    @ManyToOne(() => (MunicipalitiesEntity), (municipality) => municipality.userAddressStreets)
    @JoinColumn({ name: 'municipalityId', referencedColumnName: 'id' })
    municipality: MunicipalitiesEntity;
}