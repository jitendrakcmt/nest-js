import { UserRoles } from '../schema/user.schema';
import { IsEmail, IsEnum, IsNotEmpty, MinLength } from 'class-validator';

export class LoginDto {
  @IsNotEmpty()
  @IsEmail({}, { message: 'Please enter valid email' })
  readonly email: string;

  @IsNotEmpty()
  @MinLength(2)
  readonly password: string;

  //   @IsNotEmpty()
  //   @IsEnum(UserRoles)
  readonly role: UserRoles;
}
