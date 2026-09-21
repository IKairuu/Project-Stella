/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { RegisterUser } from './dto/RegisterUser.dto.js';
import { JwtService } from '@nestjs/jwt';
import { UserCredential } from './dto/UserCredential.dto.js';
import { UserRepository } from './user.repository.js';
import  * as bcrypt from "bcrypt";
import { UserLoginCredential } from './dto/UserLoginCredential.dto.js';

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
        const saltRounds = 10;
        const hash = await bcrypt.hash(userCredentials.password, saltRounds);
        userCredentials.password = hash ;
        const credentials = await this.userRepository.registerUserCredentials(userCredentials);
        return credentials;
    }

    async loginUser(loginType: string, userLoginCredentials: UserLoginCredential) {
        if (loginType === 'password')
            {
                const password = await this.userRepository.getUserPassword(userLoginCredentials.username);
                if (!password){
                    throw new NotFoundException('Username or Email not found')
                }
            }
        else if (loginType === 'google') {
            console.log("google")
        }
        return "TEst"
    }
}
