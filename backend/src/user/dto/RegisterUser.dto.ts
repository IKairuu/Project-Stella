/* eslint-disable prettier/prettier */
import { IsEmail, IsNotEmpty, IsString } from 'class-validator'

export class RegisterUser {
    @IsString()
    @IsNotEmpty({message: 'Invalid google ID'})
    googleId!: string

    @IsEmail()
    @IsNotEmpty({message: "Invalid email format"})
    email!: string
}