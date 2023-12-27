import { Column, Entity } from "typeorm";
import { Base } from "../base/basic.base";

@Entity({ name: 'health-issues' })
export class HealthIssueEntity extends Base {
    @Column()
    origin: string;
}