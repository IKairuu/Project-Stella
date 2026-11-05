/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { getAuth } from 'firebase-admin/auth'

@Injectable()
export class AuthService {
    constructor(private readonly jwtService: JwtService) {}
    async verifySessionToken(token: string): Promise<string>  {
        const authId = await this.jwtService.verify(token).user_id
        return authId;
    }

    async verifyIdToken(idToken: string): Promise<string> {
        try {
            return (await getAuth().verifyIdToken(idToken)).uid
        } catch {
             throw new UnauthorizedException('Invalid Google token');
        }
    }
}
