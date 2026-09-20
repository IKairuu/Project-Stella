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
                    calendar_id: userCredential.calendar_id,
                    access_token: userCredential.access_token,
                    refresh_token: userCredential.refresh_token,
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
}