/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString } from "class-validator";
import { CreateTasks } from "./CreateTasks.js";

export class EditTasks extends CreateTasks {
    @IsString()
    @IsNotEmpty({message: "ID is empty"})
    id!: string
}