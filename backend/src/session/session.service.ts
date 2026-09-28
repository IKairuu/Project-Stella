/* eslint-disable prettier/prettier */
import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { createClient, RedisClientType } from 'redis';

@Injectable()
export class SessionService implements OnModuleInit, OnModuleDestroy {
    private client!: RedisClientType
    async onModuleInit() {
        this.client = createClient({
            url: process.env["REDIS_URL"]
        })

        this.client.on('error', (err) => {
            console.log(`Redis Client Error: ${err}`)
        })
        await this.client.connect()
        console.log('Redis connected');
    }

    async onModuleDestroy() {
        await this.client.quit();
    }

    async signSession(sessionToken: string, payload: object) {
        await this.client.hSet(`session:${sessionToken}`, new Map(Object.entries(payload)))
        await this.client.expire(`session:${sessionToken}`, 60 * 60 * 24 * 30,)
    }

    async logoutSession(sessionToken: string) {
        await this.client.del(`session:${sessionToken}`)
    }
}
