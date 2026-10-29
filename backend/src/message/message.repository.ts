/* eslint-disable prettier/prettier */
import { prisma } from "../prisma.js";

/* eslint-disable prettier/prettier */
export class MessageRepository {
    async getAnalyzerMessages(userId: string){
        const messages = await prisma.analyzerMessage.findMany({
            where: {
                user_id: userId
            },
            select: {
                message: true,
                is_user: true,
                message_at: true
            }
        })
        return messages
    }

    async getGeneratorMessages(userId: string) {
        const messages = await prisma.generatorMessage.findMany({
            where: {
                user_id: userId,
            },
            select: {
                message: true,
                is_user: true,
                message_at: true
            }
        })
        return messages
    }
}