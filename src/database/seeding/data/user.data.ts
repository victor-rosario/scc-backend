import { UserInfoEntity } from '@database/entities/entity/user-info.entity'

interface UserSeedDataI {
	role: string
	email: string
	password: string
	firstName: string
	lastName: string
	active: boolean
	info: Partial<UserInfoEntity>
}

export const usersData: UserSeedDataI[] = [
	{
		role: 'Super Admin',
		email: 'superadmin@conadis.com',
		password: '1234',
		firstName: 'Bruce',
		lastName: 'Wayne',
		active: true,
		info: {
			userName: 'bwayne',
			birthDate: new Date(),
			conversationAbility: true,
			nationality: 'Dominicano',
			gender: 'MALE',
			institutionName: 'CONADIS',
			institutionPosition: 'Developer',
			rnc: '421-32-XXXX',
			phone: '8295844745',
			mobile: '8295844746',
			identification: '420-32-XXXX',
			identificationType: 'ID_CARD'
		}
	}
]
