import { Column, Entity } from "typeorm";
import { Base } from "../base/basic.base";

@Entity({ name: 'international-classification-of-diseases' })
export class InternationalClassificationDiseaseEntity extends Base {
    @Column()
    code: string;

    @Column()
    description: string;
}