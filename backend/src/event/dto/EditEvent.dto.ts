/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString } from "class-validator";
import { CreateEvent } from "./CreateEvent.dto.js";

export class EditEvent extends CreateEvent {
    @IsString()
    @IsNotEmpty({ message: "ID is empty" })
    id!: string
}