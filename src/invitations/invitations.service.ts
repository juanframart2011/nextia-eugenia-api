import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateInvitationDto } from './dto/create-invitation.dto';
import { UpdateInvitationDto } from './dto/update-invitation.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Invitation } from './entities/invitation.entity';

@Injectable()
export class InvitationsService {

  constructor(
    @InjectRepository(Invitation)
    private readonly invitationRepository:Repository<Invitation>,
  ){}

  create(createInvitationDto: CreateInvitationDto) {
    return this.invitationRepository.save(createInvitationDto);
  }

  async findAll(userId: number, page: number, limit: number) {
    
    const [results, total] = await this.invitationRepository.findAndCount({
      where: { user_id: userId },
      take: limit,
      skip: (page - 1) * limit,
    });
  
    return results; // o { results, total, page, limit };
  }

  findOne(id: number,userId:number) {
    return this.invitationRepository.findOneOrFail({
      where: {
        id: id,
        user_id: userId
      }
    });
  }

  async update(id: number, updateInvitationDto: UpdateInvitationDto, userId:number) {
    try {
      // Intenta encontrar la invitación con el ID y userID proporcionados.
      const invitationResult = await this.invitationRepository.findOneOrFail({
          where: {
              id: id,
              user_id: userId,
          },
      });

      // Si se encuentra la invitación, actualízala con los nuevos datos.
      var updatedInvitation = await this.invitationRepository.save({
          ...invitationResult, // Propaga los valores existentes
          ...updateInvitationDto, // Sobrescribe con los valores actualizados
      });

      return updatedInvitation;
    } catch (error) {
        // Si no se encuentra la invitación, findOneOrFail arrojará un error.
        throw new NotFoundException(`No existe el invitado`);
    }
  }

  remove(id: number) {
    return `This action removes a #${id} invitation`;
  }
}
