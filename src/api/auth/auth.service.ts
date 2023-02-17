import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(private userService: UserService, private jwtService: JwtService) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.getUserByEmail(email);
    if (user && bcrypt.compare(user.password, await bcrypt.hash(pass, 10))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    console.log(user, 'auth service');
    const payload = {
      user : {
        id: user.user.id,
        email: user.user.email,
        first_name: user.user.first_name,
        last_name: user.user.last_name,
        created_at: user.user.created_at,
        updated_at: user.user.updated_at
      }
    };
    return {
      access_token: this.jwtService.sign(payload),
    };

  }

  async register(data) {
    data.password = await bcrypt.hash(data.password, 10)
    let response = await this.userService.createUser(data);
    if (response) {
      const { password, ...result } = response;
      return result;
    }
  }

  decodeToken(token) : any {
    return this.jwtService.decode(token)
  }

}