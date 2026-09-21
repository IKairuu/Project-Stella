/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UserLoginCredential {
    @IsString()
    @IsNotEmpty()
    username!: string

    @IsString()
    @IsOptional()
    password!: string

    @IsString()
    @IsOptional()
    google_uid!: string
}