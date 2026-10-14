/* eslint-disable prettier/prettier */
import { IsString } from "class-validator";

/* eslint-disable prettier/prettier */
export class Message {
    @IsString()
    id!: string

    @IsString()
    agent!:string

    @IsString()
    message!:string
}