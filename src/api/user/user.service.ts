import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './user.dto';
import { GetUserDTO } from './getUser.dto';
import { User } from './user.entity';
import { JwtService } from '@nestjs/jwt';
import { instanceToPlain, plainToClass } from 'class-transformer';

@Injectable()
export class UserService {
  constructor(private jwtService: JwtService) {}
  @InjectRepository(User)
  private readonly repository: Repository<User>;

  public async getUser(id) {
    const user = await this.repository.findOneBy({ id: id });
    const userDTO = this.userToUserDTO(user);
    if (!userDTO) {
      console.log('fejl');
    }
    return userDTO;
  }

  public getLoggedInUser(req): Promise<GetUserDTO> {
    if (!req.headers?.authorization) {
      throw new BadRequestException('Authorization header not available');
    }
    let authTokenHeader = req.headers.authorization;
    authTokenHeader = authTokenHeader.split(' ')[1];
    const decodedToken = this.jwtService.decode(authTokenHeader);
    if (!decodedToken) {
      throw new BadRequestException('User token invalid or not defined');
    }
    const userJson = JSON.stringify(decodedToken);
    const userObject = JSON.parse(userJson);
    if (!userObject?.user?.id) {
      throw new BadRequestException(
        'No ID was found, check if token is a user token',
      );
    }
    const id = userObject?.user?.id;
    return this.getUser(id);
  }

  public getUserByEmail(email): Promise<User> {
    return this.repository.findOneBy({ email: email });
  }

  public createUser(body: CreateUserDto): Promise<User> {
    const user: User = new User();
    user.first_name = body.first_name;
    user.last_name = body.last_name;
    user.password = body.password;
    user.email = body.email;
    return this.repository.save(user);
  }

  public userToUserDTO(user: User) {
    const plainUser = instanceToPlain(user);
    const userToDTO = plainToClass(GetUserDTO, plainUser, {
      excludeExtraneousValues: true,
    });
    return userToDTO;
  }
}
