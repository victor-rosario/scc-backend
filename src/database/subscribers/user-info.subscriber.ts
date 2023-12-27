import { UserInfoEntity } from "@database/entities/entity/user-info.entity";
import { generateCode } from "@utils/string.util";
import { EntitySubscriberInterface, EventSubscriber, InsertEvent } from "typeorm";

@EventSubscriber()
export class UserInfoSubscriber implements EntitySubscriberInterface<UserInfoEntity> {

    public listenTo() {
        return UserInfoEntity
    }

    public beforeInsert(event: InsertEvent<UserInfoEntity>) {
        const data = event.entity

        if (data.userName) {
            event.entity.userName = generateCode(5, 'string')
        }
    }

}