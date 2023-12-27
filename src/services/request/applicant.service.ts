import { RequestEntity } from "@database/entities/entity/request.entity";
import { RolePermissionEntity } from "@database/entities/entity/role-permission.entity";
import { RoleEntity } from "@database/entities/entity/role.entity";
import { UserAddressStreetEntity } from "@database/entities/entity/user-address-street.entity";
import { UserInfoEntity } from "@database/entities/entity/user-info.entity";
import { UserPermissionEntity } from "@database/entities/entity/user-permission.entity";
import { UserEntity } from "@database/entities/entity/user.entity";
import { ApplicantRequest } from "@dto/request.dto";

export async function createApplicantService({ requestUUID, roleUUID, identification, noStreet, ...payload }: ApplicantRequest) {
    const request = await RequestEntity.findOne({ where: { uuid: requestUUID } }).catch(e => {
        console.error("RequestEntity.findOne: ", e)
        return null
    })
    if (!request) return Promise.reject({ message: "Request not found" })

    const role = await RoleEntity.findOne({ where: { uuid: roleUUID }, relations: { rolePermissions: true } }).catch(e => {
        console.error("RoleEntity.findOne: ", e)
        return null
    })
    if (!role || !role.rolePermissions.length) return Promise.reject({ message: "Role not found" })

    const foundParent = await UserEntity.findOne({ where: { requests: { id: request.id } }, relations: { requests: true } }).catch(e => {
        console.error("UserEntity.findOne: ", e)
        return null
    })
    if (!foundParent) return Promise.reject({ message: "Request not found" })

    const user = await UserEntity.create({ ...payload, roleId: role.id, active: true }).save().catch(e => {
        console.error("UserEntity.create error: ", e)
        return null
    });
    if (!user) return Promise.reject({ message: "Something went wrong while creating the user" })

    foundParent.applicants = [user];
    foundParent.save();

    const userInfo = await UserInfoEntity.create({
        ...payload,
        identification: `${identification}`,
        userId: user.id,
        userName: "t"
    }).save().catch((e) => {
        console.error("UserInfoEntity.create: ", e)
        return null
    });
    if (!userInfo) return Promise.reject({ message: "Error while creating the user info" })

    const userAddressStreet = await UserAddressStreetEntity.create({
        ...payload,
        noStreet: `${noStreet}`,
        userId: user.id
    }).save().catch(() => null);
    if (!userAddressStreet) return Promise.reject({ message: "Error while creating the user address street" });

    await recursiveUserPermissions(role.rolePermissions, user)

    return user;
}

const recursiveUserPermissions = async (rolePermissions: RolePermissionEntity[], user: UserEntity): Promise<unknown> => {

    const payload = rolePermissions.pop()
    if (!payload) return

    UserPermissionEntity.create({
        userId: user.id,
        permissionId: payload.permissionId,
        create: payload.create,
        read: payload.read,
        update: payload.update,
        delete: payload.delete,
        page: payload.page,
    }).save().catch(() => null)

    return recursiveUserPermissions(rolePermissions, user)
}