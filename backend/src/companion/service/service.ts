/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable prettier/prettier */
import { Message } from "../dto/message.dto.js";

/* eslint-disable prettier/prettier */
export class Service {
    async postMessage(body: Message, userId: string) {
        const res = await fetch(`http://localhost:5678/webhook/6d22346a-ed16-4628-b6c2-031f66718326/6d22346a-ed16-4628-b6c2-031f66718326/${userId}/${body.agent}`, 
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: body.message, id: userId })
            }
        )
        return await res.json(); 
    }

    async getSummary(userId: string) {
        const res = await fetch(`http://localhost:5678/webhook/74955b36-7ac2-45a0-bfe5-1a546b9e023f`, 
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },

                body: JSON.stringify({ id:  userId})
            }
        )
        return await res.json(); 
    }

    async postMessageTest(body: Message, userId: string) {
        const res = await fetch(`http://localhost:5678/webhook-test/6d22346a-ed16-4628-b6c2-031f66718326/6d22346a-ed16-4628-b6c2-031f66718326/${userId}/${body.agent}`, 
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: body.message, id: userId })
            }
        )
        return await res.json(); 
    }

    async getSummaryTest(userId: string) {
        const res = await fetch(`http://localhost:5678/webhook-test/74955b36-7ac2-45a0-bfe5-1a546b9e023f`, 
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },

                body: JSON.stringify({ id:  userId})
            }
        )
        return await res.json(); 
    }
}