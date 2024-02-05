import { IsEmail, IsNotEmpty } from 'class-validator';

export class RecoveryDto {
  @IsNotEmpty({ message: 'El email es obligatorio.' })
  @IsEmail({}, { message: 'Debe proporcionar un email válido.' })
  email: string;
}