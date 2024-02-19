import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, Request } from '@nestjs/common';
import { InvitationsService } from './invitations.service';
import { UpdateInvitationDto } from './dto/update-invitation.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateInvitationDto } from './dto/create-invitation.dto';

@Controller('invitations')
export class InvitationsController {
  constructor(private readonly invitationsService: InvitationsService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Request() req,@Body() createInvitationDto: CreateInvitationDto) {

    createInvitationDto.user_id = req.user.sub;
    return this.invitationsService.create(createInvitationDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  async findAll(
    @Request() req,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    var userId = req.user.sub;
    return await this.invitationsService.findAll(userId, page, limit);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Request() req,@Param('id') id: string) {
    var userId = req.user.sub;
    return this.invitationsService.findOne(+id,userId);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Request() req,@Param('id') id: string, @Body() updateInvitationDto: UpdateInvitationDto) {
    var userId = req.user.sub;
    return this.invitationsService.update(+id, updateInvitationDto,userId);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.invitationsService.remove(+id);
  }
}