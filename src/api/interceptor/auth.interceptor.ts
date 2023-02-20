import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthInterceptor implements NestInterceptor {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const tokenArray = req.headers.authorization;
    if (tokenArray) {
      req.body['user'] = this.authService.decodeToken(tokenArray);
    }
    return next.handle();
  }
}
