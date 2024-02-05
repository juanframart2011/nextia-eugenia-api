import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
export class LoginDto {
  @IsNotEmpty({ message: 'El campo de email no puede estar vacío.' })
  @IsEmail({}, { message: 'El campo de email no está en el formato requerido.' })
  email: string;

  @IsNotEmpty({ message: 'El campo de contraseña no puede estar vacío.' })
  @Transform(({ value }) => value.trim())
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres.' })
  password: string;
}
