import { Column, Entity } from "typeorm";
import { Base } from "../base/basic.base";

@Entity({ name: 'disease-history' })
export class DiseaseHistoryEntity extends Base {
    @Column()
    disease: string;
}