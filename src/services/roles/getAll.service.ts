import { RoleEntity } from "@database/entities/entity/role.entity";
import { FindManyOptions } from "typeorm";

export async function getAllRoleService(options?: FindManyOptions<RoleEntity>) {
    const roles = await RoleEntity.find(options).catch(e => {
        console.error("RoleEntity.findAndCount: ", e)
        return null
    });

    if(!roles) return Promise.reject({ message: "Something went wrong" })

    return roles;
}