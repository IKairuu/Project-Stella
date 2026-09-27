/* eslint-disable prettier/prettier */
import { IsDateString, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateEvent {
    @IsString()
    @IsNotEmpty()
    user_id!:string

    @IsString()
    @IsNotEmpty()
    title!:string

    @IsString()
    @IsOptional()
    description!:string

    @IsDateString()
    @IsNotEmpty()
    start_time!:string

    @IsDateString()
    @IsNotEmpty()
    end_time!:string
}