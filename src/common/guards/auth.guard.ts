import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const ctx = context.switchToRpc();
    const data = ctx.getData();
    const token = data?.authHeader.split(' ')[1];
    if (!token) {
      throw new RpcException(new UnauthorizedException('No token provided'));
    }

    try {
      // Verifikasi JWT
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      context.switchToRpc().getData().user = decoded;
      return true;
    } catch (err) {
      console.log(err);
      throw new RpcException(new UnauthorizedException('Invalid token'));
    }
  }
}
