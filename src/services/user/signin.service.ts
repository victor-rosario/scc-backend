import { UserEntity } from '@database/entities/entity/user.entity'
import { SignInDTO } from '@dto/auth.dto'
import logger from '@libs/logger.lib'
import { isValidEmail, isValidIDCard } from '@utils/string.util'
import { IsNull } from 'typeorm'

export async function signInService({ identification, password }: SignInDTO) {
	if (!isValidEmail(identification) && !isValidIDCard(identification)) return null
	const user = await UserEntity.findOne({
		relations: { info: true },
		where: [
		  {
			email: identification,
			active: true,
			passwords: {
			  active: true
			},
			deletedAt: IsNull()
		  },
		  {
			info: {
			  identification: identification
			},
			passwords: {
				active: true
			},  
			active: true,
			deletedAt: IsNull()
		  }
		]
	  }).catch((error) => {
		logger.error(`signInService error: ${error.message}`)
		return null
	})

	if (!user) return Promise.reject({ message: 'User not found' })

	const passwordIsValid = await user.validPassword(password)

	if (!passwordIsValid) return Promise.reject({ message: 'Invalid password' })

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { passwords, ...userToSave } = user

	return Promise.resolve(userToSave)
}