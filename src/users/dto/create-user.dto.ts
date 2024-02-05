import { Transform } from 'class-transformer';
import {IsEmail, IsString, MinLength, IsNumber} from 'class-validator';
export class CreateUserDto {
  @IsEmail()
  email: string;

  @Transform(({value}) => value.trim())
  @IsString()
  @MinLength(2)
  name: string;

  @IsString()
  last_name?: string;

  @Transform(({value}) => value.trim())
  @IsString()
  @MinLength(6)
  password: string;

  @IsNumber()
  rol_id: number;
}