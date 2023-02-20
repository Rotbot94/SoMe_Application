import { Controller, Get, Inject, Request, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { GetUserDTO } from './getUser.dto';

@Controller('user')
export class UserController {
  @Inject(UserService)
  private readonly service: UserService;
  @UseGuards(JwtAuthGuard)
  @Get()
  public getLoggedInUser(@Request() req: Request): Promise<GetUserDTO> {
    return this.service.getLoggedInUser(req);
  }
}
