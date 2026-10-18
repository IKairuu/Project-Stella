/* eslint-disable prettier/prettier */
import { IsEmail, IsNotEmpty, IsString } from 'class-validator'

export class RegisterUser {
    @IsString()
    @IsNotEmpty({message: 'Invalid google ID'})
    googleId!: string

    @IsString()
    @IsNotEmpty({message: 'ID Token is not found'})
    id_token!: string

    @IsEmail()
    @IsNotEmpty({message: "Invalid email format"})
    email!: string
}