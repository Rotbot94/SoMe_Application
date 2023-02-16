import { Injectable } from '@nestjs/common';
import { UserService } from '../api/user/user.service';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.getUser(18);
    if (user && user.password === pass) {
      debugger;
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}
