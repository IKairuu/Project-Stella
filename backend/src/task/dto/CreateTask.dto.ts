/* eslint-disable @typescript-eslint/no-wrapper-object-types */
/* eslint-disable prettier/prettier */
import { IsDateString, IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Complexity, Priority } from "../../../generated/prisma/enums.js";

export class CreateTask {
    @IsString()
    @IsNotEmpty({message: 'User ID not found'})
    user_id!: String

    @IsString()
    @IsOptional()
    event_id!: String

    @IsString()
    @IsNotEmpty({message: 'Task Name not found'})
    task_name!: String

    @IsString()
    @IsOptional()
    task_detail!: String

    @IsEnum(Priority, {message:  'Invalid Priority' })
    @IsNotEmpty()
    priority!: Priority

    @IsEnum(Complexity, {message: 'Invalid Complexity'})
    @IsNotEmpty()
    complexity!: String

    @IsDateString()
    @IsNotEmpty({message: 'Start time not found'})
    start_time!: String

    @IsDateString()
    @IsNotEmpty({message: 'End Time not found'})
    end_time!: String
}