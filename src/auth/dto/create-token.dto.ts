import { Transform } from 'class-transformer';
import { IsNumber } from 'class-validator';
export class CreateTokenDto {
  @IsNumber()
  user_id: number;

  @Transform(({ value }) => value.trim())
  token: string;
}