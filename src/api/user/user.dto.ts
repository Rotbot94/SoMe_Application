import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  Validate,
} from 'class-validator';
import { CustomEmailValidation } from '../../customValidators/email-validation';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  public first_name: string;

  @IsString()
  @IsNotEmpty()
  public last_name: string;

  @IsString()
  @IsNotEmpty()
  @IsStrongPassword({
    minLength: 4,
    minLowercase: 1,
    minUppercase: 1,
    minSymbols: 1,
    minNumbers: 1,
  })
  password: string;

  @IsNotEmpty()
  @IsEmail()
  @Validate(CustomEmailValidation)
  public email: string;
}
export class UpdateUserDTO {}
