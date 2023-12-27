import { isValidUuid } from "@utils/string.util";
import { Expose, plainToInstance } from "class-transformer";
import {
    IsArray,
    IsBoolean,
    IsNotEmpty,
    IsOptional,
    IsString,
    IsUUID,
    Validate,
    ValidationArguments,
    ValidatorConstraint,
    ValidatorConstraintInterface
} from "class-validator";


@ValidatorConstraint()
class IsValidDTO implements ValidatorConstraintInterface {
  validate() {
    return false
  }
}

export class QuestionFactorDTO {
    @IsUUID('4')
	@IsString()
	@Expose()
	@IsNotEmpty()
    uuid: string

    @IsString()
	@Expose()
	@IsNotEmpty()
    value: string;

	@IsString()
	@Expose()
	@IsOptional()
    reason?: string;
}

export class SupportProductDTO {
    @IsUUID('4')
	@IsString()
	@Expose()
	@IsNotEmpty()
    uuid: string

    @IsBoolean()
	@Expose()
	@IsNotEmpty()
    value: boolean;
}

export class AsnwerContextualFactorDTO {
    @IsUUID('4')
	@IsString()
	@Expose()
	@IsNotEmpty()
	requestUUID: string

    @IsArray()
    @Expose()
    @Validate(IsValidDTO, {
        message: (validationArguments: ValidationArguments) => {
            const body = plainToInstance(
                AsnwerContextualFactorDTO,
                validationArguments?.object
            )

            if(!body.questions || !body.questions?.length) return 'Contextual questions should not be empty'
        
            const isUuidValid =  (body.questions).every(x => x?.['uuid'] ? isValidUuid(x['uuid']) : false);
        
            const isValueValid = (body.questions).every(x => {
                const isValid = x?.['value'] === '' || x?.['value'] === undefined || x?.['value'] === null ? false : true
                return isValid
            });
        
            if(!isUuidValid) return 'Contextual question uuid should not be empty or is not valid'
            if(!isValueValid) return 'Contextual question value should not be empty or is not valid'

            return 'default'
        }
    })
	questions: QuestionFactorDTO[]

    @IsArray()
    @Expose()
    @Validate(IsValidDTO, {
        message: (validationArguments: ValidationArguments) => {
            const body = plainToInstance(
                AsnwerContextualFactorDTO,
                validationArguments?.object
            )

            if(!body.supportProducts || !body.supportProducts?.length) return 'Support products should not be empty'
        
            const isUuidValid =  (body.supportProducts).every(x => x?.['uuid'] ? isValidUuid(x['uuid']) : false);
        
            const isValueValid = (body.supportProducts).every(x => {
                const isValid = x?.['value'] === undefined || x?.['value'] === null ? false : true
                return isValid
            });
            let message = '';
            if(!isUuidValid) message = 'Support product uuid should not be empty or is not valid'
            if(!isValueValid) message = 'Support product value should not be empty or is not valid'

            return message
        }
    })
	supportProducts: SupportProductDTO[]
}