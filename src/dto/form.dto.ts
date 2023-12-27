import { isValidUuid } from '@utils/string.util'
import { Expose, plainToInstance } from 'class-transformer'
import {
	IsUUID,
	IsString,
	IsNotEmpty,
	IsArray,
	Validate,
	ValidatorConstraint,
	ValidatorConstraintInterface,
    IsNumber,
    IsPositive
} from 'class-validator'

@ValidatorConstraint()
class IsUUIDArray implements ValidatorConstraintInterface {
	validate() {
		return false
	}
}

export class AnswerQuestionDTO {
    @IsUUID('4')
	@IsString()
	@Expose()
	@IsNotEmpty()
    uuid: string

	@IsNumber()
    @IsPositive()
	@Expose()
	@IsNotEmpty()
    value: number
}

export class FormQuestionDTO {
	@IsUUID('4')
	@IsString()
	@Expose()
	@IsNotEmpty()
	formUUID: string

	@IsUUID('4')
	@IsString()
	@Expose()
	@IsNotEmpty()
	requestUUID: string

	@IsArray()
	@Validate(IsUUIDArray, {
		message(validationArguments) {
			const body = plainToInstance(
				FormQuestionDTO,
				validationArguments.object
			)

			const message = body.questions.reduce((a, b, _, arr) => {
				if (!b.uuid) a = 'Question UUID is required'
				if (b.value === undefined || b.value === null) a = 'Value is required'
				if (!isValidUuid(b.uuid)) a = 'Question UUID is not valid'

				arr.slice(1)

				return a
			}, '')

			return message
		}
	})
	@Expose()
	questions: AnswerQuestionDTO[]
}
