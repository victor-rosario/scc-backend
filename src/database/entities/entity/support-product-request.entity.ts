import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { Base } from "../base/basic.base";
import { SupportProductEntity } from "./support-product.entity";
import { ContextualFactorEntity } from "./contextual-factor.entity";

@Entity({ name: 'support-products-request' })
export class SupportProductRequestEntity extends Base {
    @Column()
    supportProductId: number;

    @ManyToOne(() => (SupportProductEntity), (supportProduct) => supportProduct.supportProducts)
    @JoinColumn({ name: 'supportProductId', referencedColumnName: 'id' })
    supportProduct: SupportProductEntity;

    @Column()
    contextualFactorId: number;

    @ManyToOne(() => (ContextualFactorEntity), (contextualFactor) => contextualFactor.supportProductRequests)
    @JoinColumn({ name: 'contextualFactorId', referencedColumnName: 'id' })
    contextualFactor: ContextualFactorEntity;

    @Column({ default: false })
    value: boolean;
}