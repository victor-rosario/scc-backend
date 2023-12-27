import { Expose } from "class-transformer";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateRoleDTO {
    @IsString()
    @IsNotEmpty()
    @Expose()
    name: string;
}

export class UpdateRoleDTO extends CreateRoleDTO {
    @IsString()
    uuid: string;
}