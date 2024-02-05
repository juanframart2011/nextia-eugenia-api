import { Transform } from 'class-transformer';
import {IsEmail, IsString, MinLength, IsNumber, IsNotEmpty} from 'class-validator';
export class CreateUserDto {
  @IsNotEmpty({ message: 'El campo de email no puede estar vacío.' })
  @IsEmail({}, { message: 'El campo de email no está en el formato requerido.' })
  email: string;

  @IsNotEmpty({ message: 'El campo de nombre no puede estar vacío.' })
  @Transform(({value}) => value.trim())
  @IsString()
  @MinLength(2)
  name: string;

  @IsNotEmpty({ message: 'El campo de apellido no puede estar vacío.' })
  @Transform(({value}) => value.trim())
  @IsString()
  last_name?: string;

  @IsNotEmpty({ message: 'El campo de contraseña no puede estar vacío.' })
  @Transform(({value}) => value.trim())
  @IsString()
  @MinLength(6)
  password: string;

  @IsNotEmpty({ message: 'El campo de rol no puede estar vacío.' })
  @Transform(({value}) => value.trim())
  rol_id: number;

  @IsNotEmpty({ message: 'El campo de número de departamento no puede estar vacío.' })
  @Transform(({value}) => value.trim())
  no_department: number;
}