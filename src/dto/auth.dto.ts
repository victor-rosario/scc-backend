import { Expose } from 'class-transformer'
import {
	IsNotEmpty,
	IsString
} from 'class-validator'

export class SignInDTO {
	@IsNotEmpty()
	@IsString()
	@Expose()
	identification: string

	@IsNotEmpty()
	@IsString()
	@Expose()
	password: string
}
