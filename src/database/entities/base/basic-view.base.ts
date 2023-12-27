import { instanceToPlain } from "class-transformer";
import { BaseEntity } from "typeorm";

export class BaseView extends BaseEntity {
    public toJSON() {
        return instanceToPlain(this);
    }
}