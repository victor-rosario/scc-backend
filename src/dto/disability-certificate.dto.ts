import { Expose } from "class-transformer";
import { IsBoolean, IsNotEmpty, IsString, IsUUID } from "class-validator";

export class answerDisabilityCertificateDTO {

    @IsUUID('4')
    @IsString()
    @Expose()
    @IsNotEmpty()
    requestUUID: string;

    @IsNotEmpty()
    @IsString()
    @Expose()
    forecastDescripcion: string

    @IsNotEmpty()
    @IsString()
    @Expose()
    contextDescription: string

    @IsBoolean()
    @Expose()
    @IsNotEmpty()
    coherence: boolean;

    @IsNotEmpty()
    @IsString()
    @Expose()
    hypothesis: string

    @IsNotEmpty()
    @IsString()
    @Expose()
    justification: string

    @IsNotEmpty()
    @IsString()
    @Expose()
    observations: string

    @IsBoolean()
    @Expose()
    @IsNotEmpty()
    hasADisability: boolean;

    @IsString()
    @Expose()
    @IsNotEmpty()
    originDisability: string;

}