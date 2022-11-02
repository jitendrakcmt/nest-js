import { UserRoles } from '../schema/user.schema';
import {
  IsEmail,
  // IsEnum,
  IsNotEmpty,
  MinLength,
  IsString,
  IsPhoneNumber,
} from 'class-validator';

export class SignUpDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsEmail({}, { message: 'Please enter valid email' })
  readonly email: string;

  @IsNotEmpty()
  @IsPhoneNumber()
  readonly phone: number;

  @IsNotEmpty()
  @MinLength(2)
  readonly password: string;

  //   @IsNotEmpty()
  //   @IsEnum(UserRoles)
  readonly role: UserRoles;
}
