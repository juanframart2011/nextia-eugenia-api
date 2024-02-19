import { Module } from '@nestjs/common';
import { InvitationsService } from './invitations.service';
import { InvitationsController } from './invitations.controller';
import { Invitation } from './entities/invitation.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Invitation])],
  controllers: [InvitationsController],
  providers: [InvitationsService],
  exports:[InvitationsService],
})
export class InvitationsModule {}
