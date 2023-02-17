import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './user.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  @InjectRepository(User)
  private readonly repository: Repository<User>;

  public getUser(id): Promise<User> {
    return this.repository.findOneBy({ id: id });
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
}
