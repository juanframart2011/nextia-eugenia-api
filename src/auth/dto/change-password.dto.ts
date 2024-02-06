import { Transform } from 'class-transformer';
import { IsNotEmpty, MinLength } from 'class-validator';
export class ChangePassword {
  @IsNotEmpty({ message: 'El campo de contraseña no puede estar vacío.' })
  @Transform(({ value }) => value.trim())
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres.' })
  password: string;

  @IsNotEmpty({ message: 'No tienes token.' })
  @Transform(({ value }) => value.trim())
  token: string;
}
