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
      
      const invitationResult = await this.invitationRepository.findOneOrFail({
          where: {
              id: id,
              user_id: userId,
          },
      });

      var updatedInvitation = await this.invitationRepository.save({
          ...invitationResult,
          ...updateInvitationDto,
      });

      return updatedInvitation;
    } catch (error) {
        // Si no se encuentra la invitación, findOneOrFail arrojará un error.
        throw new NotFoundException(`No existe el invitado`);
    }
  }

  async remove(id: number, userId:number) {
    try {
      
      const invitationResult = await this.invitationRepository.findOneOrFail({
          where: {
              id: id,
              user_id: userId,
          },
      });

      return await this.invitationRepository.softDelete(id);
    } catch (error) {
        // Si no se encuentra la invitación, findOneOrFail arrojará un error.
        throw new NotFoundException(`No existe el invitado`);
    }
  }
}