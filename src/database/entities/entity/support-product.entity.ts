import { Column, Entity, OneToMany } from "typeorm";
import { Base } from "../base/basic.base";
import { SupportProductRequestEntity } from "./support-product-request.entity";

@Entity({ name: 'support-products' })
export class SupportProductEntity extends Base {
    @Column()
    name: string;

    @Column()
    category: string;

    @OneToMany(() => (SupportProductRequestEntity), (supportProductRequest) => supportProductRequest.supportProduct)
    supportProducts: SupportProductRequestEntity[];
}