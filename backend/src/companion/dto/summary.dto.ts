/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString } from "class-validator";

export class Summary {
    @IsString()
    @IsNotEmpty()
    id!:string
}