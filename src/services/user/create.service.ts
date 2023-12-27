import { RolePermissionEntity } from "@database/entities/entity/role-permission.entity";
import { RoleEntity } from "@database/entities/entity/role.entity";
import { UserAddressStreetEntity } from "@database/entities/entity/user-address-street.entity";
import { UserInfoEntity } from "@database/entities/entity/user-info.entity";
import { UserPermissionEntity } from "@database/entities/entity/user-permission.entity";
import { UserEntity } from "@database/entities/entity/user.entity";
import { CreateUserDTO } from "@dto/user.dto";
import { ProvincesEntity } from "@database/entities/entity/province.entity";
import { MunicipalitiesEntity } from "@database/entities/entity/municipality.entity";

export async function createUserService({
    roleSlug,
    noStreet,
    identification,
    provinceUUID,
    municipalityUUID,
    ...createUserDTO
}: CreateUserDTO & { roleSlug: string, active: boolean }) {

    const province = await ProvincesEntity.findOne({
        where: {
            uuid: provinceUUID
        }
    }).catch(() => null)
    if (!province) return Promise.reject({ message: "Invalid province, not found" })

    const municipality = await MunicipalitiesEntity.findOne({
        where: {
            uuid: municipalityUUID,
            provinceId: province.id
        }
    }).catch(() => null)
    if (!municipality) return Promise.reject({ message: "Invalid municipality, not found" })

    const role = await RoleEntity.findOne({
        where: {
            slug: roleSlug
        },
        relations: {
            rolePermissions: true
        },
        cache: true
    }).catch(() => null)
    if (!role || !role.rolePermissions?.length) return Promise.reject({ message: "Invalid role" })

    const user = await UserEntity.create({ ...createUserDTO, roleId: role.id }).save().catch((e) => {
        console.error("UserEntity.create error: ", e)
        return null
    });
    if (!user) return Promise.reject({ message: "Error while create user" })

    // TODO: Generate this username to way dynamic
    const userInfo = await UserInfoEntity.create({
        ...createUserDTO,
        identification: `${identification}`,
        userId: user.id,
        userName: user.email
    }).save().catch((e) => {
        console.error("UserInfoEntity.create: ", e)
        return null
    });
    if (!userInfo) return Promise.reject({ message: "Error while creating the user info" })

    const userAddressStreet = await UserAddressStreetEntity.create({
        ...createUserDTO,
        noStreet: `${noStreet}`,
        userId: user.id,
        province: province,
        municipality: municipality
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