import {
  IsEmail,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  surname: string;

  @IsString()
  @MinLength(8)
  @MaxLength(32)
  /** 
   - Passwords will contain at least 1 upper case letter
   - Passwords will contain at least 1 lower case letter
   - Passwords will contain at least 1 number or special character
   -> https://regexper.com
  **/
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password is too weak',
  })
  password: string;
}
