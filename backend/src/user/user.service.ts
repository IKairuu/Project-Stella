/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { RegisterUser } from './dto/RegisterUser.dto.js';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
    constructor(private readonly jwtService: JwtService) {}
    registerUserRegistration(userCredentials: RegisterUser) {
        const payload = { googleId: userCredentials.googleId, email: userCredentials.email };
        const token = this.jwtService.sign(payload, {expiresIn: '2h'})
        return { token: token };
    }
}
