/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { WsException } from '@nestjs/websockets';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isWs = context.getType() === 'ws';
    const request = isWs
    ? context.switchToWs().getClient()        
    : context.switchToHttp().getRequest();    
    const token = this.extractToken(request, isWs)
    

    try {
      await this.jwtService.verify(token!)
    } catch {
      throw this.fail(isWs, "Invalid Token")
    }
    return true;
  }

  private extractToken(req: any, isWs: boolean): string | undefined {
    const headers = isWs ? req.handshake?.headers : req.headers;
    const authorization: string | undefined = headers?.authorization;

    if (!authorization) {
      throw this.fail(isWs, "Unauthorized Access")
  }
    const [type, token] = authorization.split(' ');
    if (type !== 'Bearer' || !token) {
      throw this.fail(isWs, 'Unauthorized Access');
    }
    return token;
  }

  private fail(isWs: boolean, message: string) {
    return isWs ? new WsException(message) : new UnauthorizedException(message);
  }
}