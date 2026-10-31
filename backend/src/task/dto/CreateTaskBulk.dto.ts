/* eslint-disable prettier/prettier */
import { ArrayMinSize, IsArray, ValidateNested } from "class-validator";
import { Type } from "class-transformer"
import { CreateTasks } from "./CreateTasks.js";

export class CreateTaskBulk {
    @IsArray()
    @ArrayMinSize(1)
    @ValidateNested({ each: true })
    @Type(() => CreateTasks)
    tasks!: CreateTasks[]
}