import { PartialType } from '@nestjs/mapped-types';
import { CreateInvitationDto } from './create-invitation.dto';
import { Transform } from 'class-transformer';
import { IsDateString, IsNotEmpty, IsNumber, IsString, MinLength } from 'class-validator';

export class UpdateInvitationDto extends PartialType(CreateInvitationDto) {

    @IsNotEmpty({ message: 'El campo de nombre es obligatorio.' })
    @Transform(({value}) => value.trim())
    @IsString()
    @MinLength(2)
    name: string;
    
    @IsNotEmpty({ message: 'El campo de entrada es obligatorio.' })
    @IsDateString({}, { message: 'El formato de la fecha de expiración no es válido.' })
    entry_date: Date;
    
    @IsNotEmpty({ message: 'El campo de expiración es obligatorio.' })
    @IsDateString({}, { message: 'El formato de la fecha de expiración no es válido.' })
    expiration: Date;
}