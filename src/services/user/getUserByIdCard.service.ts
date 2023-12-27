import { GenderEnum } from '@database/entities/entity/user-info.entity'
import { UserEntity } from '@database/entities/entity/user.entity'
import microslabProvider from '@providers/microslab/microslab.provider'
import { isValidIDCard } from '@utils/string.util'

interface IUserTransform {
  identification: string
  firstName: string
  lastName: string
  birthDate: string
  gender: string
  nationality: string
}

export async function getUserByIdCardService(identification: string) {
	if (!isValidIDCard(identification)) {
    return Promise.reject({ message: "The id card is not valid" })
  }

	const user = await UserEntity.findOne({
		where: {
      info: { identification }
    },
		relations: {
      info: true,  
    }
	}).catch((e) => {
		console.error('UserInfoEntity.findOne: ', e)
		return null
	})

	if (user) {
    const data: IUserTransform = {
      birthDate: user.info.birthDate.toISOString(),
      firstName: user.firstName.capitalize(),
      lastName: user.firstName.capitalize(),
      gender: user.info.gender,
      identification: user.info.identification,
      nationality: user.info.nationality.capitalize()
    }
    return data
  }

	if (!user) {
		const identificationData = await microslabProvider.idenfitication(identification).catch(e => {
      console.error("microslabProvider.idenfitication error: ", e)
      return null
    })

    if(!identificationData) return Promise.reject({ message: "Error" })

    const data: IUserTransform = {
      birthDate: new Date(identificationData.fechaNacimiento).toISOString(),
      firstName: identificationData.nombre.capitalize(),
      lastName: identificationData.apellidos.capitalize(),
      gender: identificationData.sexo === 'M' ? GenderEnum.MALE : GenderEnum.FEMALE,
      identification: identificationData.cedula,
      nationality: identificationData.nacionalidad.capitalize()
    }

		return data
	}
}
