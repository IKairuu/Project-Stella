/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { prisma } from "../prisma.js"


@Injectable()
export class UserRepository {
    async registerUserCredentials() {
        const credentials = await prisma.user.findMany()
        return credentials;
    }
}