import { Transform, Type } from "class-transformer";
import { IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString, MinLength } from "class-validator";

export class CreateInvitationDto {

    @IsOptional()
    @IsNumber()
    user_id?: number;
    
    @IsNotEmpty({ message: 'El campo de nombre es obligatorio.' })
    @IsString()
    @MinLength(2)
    name: string;

    @IsOptional()
    @IsString()
    @MinLength(2)
    qr?: string;
    
    @IsNotEmpty({ message: 'El campo de entrada es obligatorio.' })
    @IsDateString({}, { message: 'El formato de la fecha de expiración no es válido.' })
    entry_date: Date;
    
    @IsNotEmpty({ message: 'El campo de expiración es obligatorio.' })
    @IsDateString({}, { message: 'El formato de la fecha de expiración no es válido.' })
    expiration: Date;
}