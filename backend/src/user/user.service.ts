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
        return payload;
    }
}
