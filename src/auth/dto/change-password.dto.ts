import { Transform } from 'class-transformer';
import { MinLength } from 'class-validator';
export class ChangePassword {
  @Transform(({ value }) => value.trim())
  @MinLength(6)
  password: string;

  @Transform(({ value }) => value.trim())
  token: string;
}
