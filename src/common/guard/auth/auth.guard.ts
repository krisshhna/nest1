import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(public jwt:JwtService){}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    let req = context.switchToHttp().getRequest();
    let token = req.headers.authorization;
    if(token){
      token = token.slice(7);
      let checktoken = await this.jwt.verifyAsync(token, {secret:`${process.env.JWTSECRET}`});
      if(checktoken){
        req.users = checktoken;
        return true;
      }
    }
    return false;
  }
}
