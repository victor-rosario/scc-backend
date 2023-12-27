import { Expose } from "class-transformer";
import {
    IsArray,
    IsDateString,
    IsNotEmpty,
    IsOptional,
    IsString,
    IsUUID
} from "class-validator";
import { CreateUserDTO } from "./user.dto";

export class CreateRequestDTO extends CreateUserDTO {
    @IsArray()
    @IsNotEmpty()
    @Expose()
    motiveUUIDs: string[];

    @IsArray()
    @IsNotEmpty()
    @Expose()
    communicationUUIDs: string[];

    @IsString()
    @IsOptional()
    @Expose()
    reason: string;

    // @IsUUID('4')
    // @IsString()
    // @Expose()
    // @IsNotEmpty()
    // branchOfficeUUID: string;

    // @IsUUID('4')
    // @IsString()
    // @Expose()
    // @IsNotEmpty()
    // serviceAppointmentUUID: string;

    @IsDateString()
    @IsNotEmpty()
    @Expose()
    schedule: string;
}

export class UpdateRequestDTO { 
    @IsUUID('4')
    @IsString()
    @Expose()
    @IsNotEmpty()
    requestUUID: string;
}

export class ApplicantRequest extends CreateUserDTO {
    @IsUUID('4')
    @IsString()
    @Expose()
    @IsNotEmpty()
    roleUUID: string;

    @IsUUID('4')
    @IsString()
    @Expose()
    @IsNotEmpty()
    requestUUID: string;
}