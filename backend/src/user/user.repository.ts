/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { prisma } from "../prisma.js"
import { UserCredential } from "./dto/UserCredential.dto.js";
import { User_Type } from "../../generated/prisma/enums.js";


@Injectable()
export class UserRepository {
    async registerUserCredentials(userCredential: UserCredential) {
        const credentials = await prisma.user.create(
            {
                data: {
                    google_uid: userCredential.google_uid,
                    email_address: userCredential.email,
                    username: userCredential.username,
                    hashed_password: userCredential.password,
                    occupation: userCredential.occupation,
                    type: User_Type.user
                },
                select: {
                    id: true,
                    username: true,
                    type: true,
                    occupation: true
                }
            }
        )
        return credentials;
    }

    async getUserCredentialsPassword(username: string) {
        const credentials = await prisma.user.findFirst({
            where: { 
                OR: [
                        { 
                            username: username 
                        }, 
                        { 
                            email_address: username 
                        }
                    ]
                }, 
                select: { 
                    hashed_password: true,
                    id: true,
                    username: true,
                    type: true,
                    occupation: true
                 }
        })
        return credentials;
    }

    async getUserCredentialsGoogle(googleUid: string) {
        const credentials = await prisma.user.findFirst({
            where: {  
                google_uid: googleUid
            },
            select: {
                id: true,
                username: true,
                type: true,
                occupation: true
            }
        })
        return credentials;

    }
}