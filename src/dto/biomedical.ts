/* eslint-disable @typescript-eslint/no-unused-vars */
import { Expose, plainToInstance } from "class-transformer";
import {
    IsArray,
    IsBoolean,
    IsDateString,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
    IsUUID,
    Validate,
    ValidatorConstraint,
    ValidatorConstraintInterface
} from "class-validator";

@ValidatorConstraint()
class IsTreatingPhysicianInfoDTO implements ValidatorConstraintInterface {
    public async validate(_: TreatingPhysicianInfoDTO) {
        return false
    }
}

export class TreatingPhysicianInfoDTO {

    @IsString()
    @Expose()
    @IsNotEmpty()
    firstName: string;

    @IsString()
    @Expose()
    @IsNotEmpty()
    lastName: string;

    @IsString()
    @Expose()
    @IsNotEmpty()
    phoneNumber: string;

    @IsString()
    @Expose()
    @IsNotEmpty()
    exequatur: string;

    @IsString()
    @Expose()
    @IsNotEmpty()
    specialty: string;

    @IsString()
    @Expose()
    @IsNotEmpty()
    pss: string;

    @IsString()
    @Expose()
    @IsNotEmpty()
    healthRegion: string;

    @IsString()
    @Expose()
    @IsNotEmpty()
    healthArea: string;

    @IsString()
    @Expose()
    @IsNotEmpty()
    healthZone: string;

    @IsDateString()
    @Expose()
    @IsNotEmpty()
    reportDate: string;
}

export class CreateBiomedicalDTO {
    @IsUUID('4')
    @IsString()
    @Expose()
    @IsNotEmpty()
    requestUUID: string;

    @IsArray()
    @IsUUID('4', { each: true })
    @Expose()
    perinatalDiseaseHistoryUUIDs: string[];

    @IsArray()
    @IsUUID('4', { each: true })
    @Expose()
    maternalDiseaseHistoryUUIDs: string[];

    @IsArray()
    @IsUUID('4')
    @Expose()
    classificationDiseaseUUID: string;

    @IsString()
    @Expose()
    @IsNotEmpty()
    descriptionDiagnose: string;

    @IsString()
    @Expose()
    @IsOptional()
    relevantFamilyHistory: string;

    @IsArray()
    @Expose()
    @IsNotEmpty()
    healthIssueUUIDs: string[];

    @IsString()
    @Expose()
    @IsNotEmpty()
    ageGestional: string;

    @IsNumber()
    @Expose()
    @IsNotEmpty()
    birthWeightPoundsLb: number;

    @IsNumber()
    @Expose()
    @IsNotEmpty()
    headCircumferenceCm: number;

    @IsBoolean()
    @Expose()
    @IsNotEmpty()
    revival: boolean;

    @IsNumber()
    @Expose()
    @IsOptional()
    apgar: number;

    @IsString()
    @Expose()
    @IsOptional()
    reasonPerinatal: string;

    @IsString()
    @Expose()
    @IsOptional()
    reasonMaternal: string;

    @IsString()
    @Expose()
    @IsOptional()
    descriptionTherapeutic: string;

    @IsBoolean()
    @Expose()
    @IsNotEmpty()
    optionsExhausted: boolean;

    @IsBoolean()
    @Expose()
    @IsNotEmpty()
    permanentOrLongTerm: boolean;

    @IsBoolean()
    @Expose()
    @IsNotEmpty()
    degenerativeCondition: boolean;

    @IsBoolean()
    @Expose()
    @IsNotEmpty()
    anosognosia: boolean;

    @IsBoolean()
    @Expose()
    @IsNotEmpty()
    deafblindnessDiagnosis: boolean;

    @IsBoolean()
    @Expose()
    @IsNotEmpty()
    dementiaDiagnosis: boolean;

    @IsBoolean()
    @Expose()
    @IsNotEmpty()
    emotionalLability: boolean;

    @Validate(IsTreatingPhysicianInfoDTO, {
        message(validationArguments) {
            const body = plainToInstance(CreateBiomedicalDTO, validationArguments.object)

            let message = ''

            if (!body.treatingPhysicianInfo?.firstName)
                message = 'Treating Physician - first name is required'
            if (!body.treatingPhysicianInfo?.lastName)
                message = 'Treating Physician - last name is required'
            if (!body.treatingPhysicianInfo?.exequatur)
                message = 'Treating Physician - exequatur is required'
            if (!body.treatingPhysicianInfo?.phoneNumber)
                message = 'Treating Physician - phone number is required'
            if (!body.treatingPhysicianInfo?.healthArea)
                message = 'Treating Physician - health area is required'
            if (!body.treatingPhysicianInfo?.healthRegion)
                message = 'Treating Physician - health region is required'
            if (!body.treatingPhysicianInfo?.healthZone)
                message = 'Treating Physician - health zone is required'
            if (!body.treatingPhysicianInfo?.specialty)
                message = 'Treating Physician - specialty is required'
            if (!body.treatingPhysicianInfo?.reportDate)
                message = 'Treating Physician - report date is required'

            return message
        }
    })
    @Expose()
    treatingPhysicianInfo: TreatingPhysicianInfoDTO

}
