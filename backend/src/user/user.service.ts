/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { RegisterUser } from './dto/RegisterUser.dto.js';
import { JwtService } from '@nestjs/jwt';
import { UserCredential } from './dto/UserCredential.dto.js';
import { UserRepository } from './user.repository.js';
import  * as bcrypt from "bcrypt";

@Injectable()
export class UserService {
    constructor(private readonly jwtService: JwtService, private userRepository: UserRepository) {}

    registerUserRegistration(userCredentials: RegisterUser) {
        const payload = { googleId: userCredentials.googleId, email: userCredentials.email };
        const token = this.jwtService.sign(payload, {expiresIn: '10m'})
        return { token: token };
    }

    async registerUser(userCredentials: UserCredential, tokenId: string){
        try {
            await this.jwtService.verify(tokenId);
        }
        catch {
            throw new UnauthorizedException("Invalid Token")
        }
        const credentials = await this.userRepository.registerUserCredentials(userCredentials);
        return credentials;
    }
}
