/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable prettier/prettier */
import { IsEmail, IsNotEmpty, IsString, IsStrongPassword } from "class-validator";

export class UserCredential {
    @IsString()
    @IsNotEmpty({message: 'Invalid Google UID'})
    google_uid!: string

    @IsEmail()
    @IsNotEmpty({message: 'There is no email address'})
    email!: string

    @IsString()
    @IsNotEmpty({message: 'There is no provided username'})
    username!: string

    @IsStrongPassword()
    @IsNotEmpty({message: 'There is no provided password'})
    password!: string

    @IsString()
    @IsNotEmpty({message: 'There is no provided occupation'})
    occupation!: string
}