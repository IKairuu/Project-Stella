/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/await-thenable */
/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { RegisterUser } from './dto/RegisterUser.dto.js';
import { JwtService } from '@nestjs/jwt';
import { UserCredential } from './dto/UserCredential.dto.js';
import { UserRepository } from './user.repository.js';
import  * as bcrypt from "bcrypt";
import { UserLoginCredential } from './dto/UserLoginCredential.dto.js';
import { SessionService } from '../session/session.service.js';

@Injectable()
export class UserService {
    constructor(private readonly jwtService: JwtService, private userRepository: UserRepository, private readonly sessionService: SessionService) {}

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
        const token = this.jwtService.sign({user_id: credentials["id"], type: credentials["type"]}, {expiresIn: '10m'})
        const payload = { credentials: credentials, token: token }
        return payload;
    }

    async loginUser(loginType: string, userLoginCredentials: UserLoginCredential) {
        let payload = {} ;
        if (loginType === 'password')
            {
                const credentials = await this.userRepository.getUserCredentialsPassword(userLoginCredentials.username);
                if (!credentials){
                    throw new NotFoundException('Username or Email not found')
                }
                
                if (await bcrypt.compare(userLoginCredentials.password, credentials.hashed_password)){
                    payload = { 
                        id: credentials.id,
                        username: credentials.username,
                        type: credentials.type,
                        occupation: credentials.occupation
                     }
                }
                else {
                    throw new UnauthorizedException('Invalid Email/Username or password')
                }
            }
        else if (loginType === 'google') {
            const credentials = await this.userRepository.getUserCredentialsGoogle(userLoginCredentials.google_uid);
            if (!credentials){
                throw new UnauthorizedException("Google account not signed in")
            }
            payload = {
                id: credentials.id,
                username: credentials.username,
                type: credentials.type,
                occupation: credentials.occupation
            }
        }
        else {
            throw new BadRequestException('Invalid login type')
        }

        const token = await this.jwtService.sign({user_id: payload["id"], type: payload["type"]}, {expiresIn: '3h'})
        await this.sessionService.signSession(token, payload) // refactor this
        payload = {...payload, token: token}
        return payload;
    }
}
