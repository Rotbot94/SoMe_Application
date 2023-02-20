import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { UserService } from '../api/user/user.service';

@ValidatorConstraint({ name: 'email', async: true })
@Injectable()
export class CustomEmailValidation implements ValidatorConstraintInterface {
  constructor(private readonly userService: UserService) {}

  async validate(value: string): Promise<boolean> {
    return this.userService.getUserByEmail(value).then((user) => {
      if (user) {
        throw new UnprocessableEntityException('Email already exists');
      } else {
        return true;
      }
    });
  }
}
