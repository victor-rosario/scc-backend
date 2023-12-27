import { UserEntity } from '@database/entities/entity/user.entity'

const memory = new Map<string, UserEntity>()

export default {
	get(uuid: string): UserEntity | undefined {
		return memory.get(uuid)
	},

	set(uuid: string, user: UserEntity) {
		memory.set(uuid, user)
	},

	remove(uuid: string) {
		memory.delete(uuid)
	}
}
