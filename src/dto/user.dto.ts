import { GenderEnum, GenderType, IdentificationEnum, IdentificationType } from "@database/entities/entity/user-info.entity"
import { Expose } from "class-transformer"
import { IsString, IsNotEmpty, IsOptional, IsNumber, IsPositive, IsBoolean, IsEnum, IsUUID } from "class-validator"

export class CreateUserDTO {
    @IsString()
    @IsNotEmpty()
    @Expose()
    firstName: string

    @IsString()
    @IsNotEmpty()
    @Expose()
    lastName: string

    @IsString()
    @IsOptional()
    @Expose()
    userName: string;

    @IsString()
    @IsOptional()
    @Expose()
    email: string

    @IsString()
    @IsNotEmpty()
    @Expose()
    phone: string

    @IsString()
    @IsOptional()
    @Expose()
    mobile: string

    @IsEnum(GenderEnum)
    @IsNotEmpty()
    @Expose()
    gender: GenderType;

    @IsString()
    @IsNotEmpty()
    @Expose()
    birthDate: string;

    @IsString()
    @IsNotEmpty()
    @Expose()
    identification: string;

    @IsEnum(IdentificationEnum)
    @IsNotEmpty()
    @Expose()
    identificationType: IdentificationType;

    @IsString()
    @IsNotEmpty()
    @Expose()
    address: string;

    @IsString()
    @IsOptional()
    @Expose()
    neighborhood: string;

    @IsUUID('4')
    @IsString()
    @Expose()
    @IsNotEmpty()
    provinceUUID: string;

    @IsUUID('4')
    @IsString()
    @Expose()
    @IsNotEmpty()
    municipalityUUID: string;

    @IsString()
    @IsNotEmpty()
    @Expose()
    nationality: string;

    @IsNumber()
    @IsPositive()
    @IsNotEmpty()
    @Expose()
    noStreet: number;

    @IsBoolean()
    @IsNotEmpty()
    @Expose()
    conversationAbility: boolean;

    @IsString()
    @IsOptional()
    @Expose()
    institutionName: string;

    @IsString()
    @IsOptional()
    @Expose()
    rnc: string;

    @IsString()
    @IsOptional()
    @Expose()
    institutionPosition: string;
}