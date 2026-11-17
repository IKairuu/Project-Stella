/* eslint-disable prettier/prettier */
import { IsString } from "class-validator";

/* eslint-disable prettier/prettier */
export class Message {
    @IsString()
    agent!:string

    @IsString()
    message!:string
}