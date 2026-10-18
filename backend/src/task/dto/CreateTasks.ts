/* eslint-disable prettier/prettier */
import { IsDateString, IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Complexity, Priority } from "../../../generated/prisma/enums.js";

export class CreateTasks {
    @IsString()
    @IsOptional()
    event_id!: string

    @IsString()
    @IsNotEmpty({message: 'Task Name not found'})
    task_name!: string

    @IsString()
    @IsOptional()
    task_detail!: string

    @IsEnum(Priority, {message:  'Invalid Priority' })
    @IsNotEmpty()
    priority!: Priority

    @IsEnum(Complexity, {message: 'Invalid Complexity'})
    @IsNotEmpty()
    complexity!: Complexity

    @IsDateString()
    @IsNotEmpty({message: 'Start time not found'})
    start_time!: string

    @IsDateString()
    @IsNotEmpty({message: 'End Time not found'})
    end_time!: string
}