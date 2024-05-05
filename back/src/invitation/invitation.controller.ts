import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InvitationService } from './invitation.service';
import { CreateInvitationDto } from './dto/create-invitation.dto';
import { UpdateInvitationDto } from './dto/update-invitation.dto';

@Controller('invitation')
export class InvitationController {
  constructor(private readonly invitationService: InvitationService) {}

  @Post()
  create(@Body() createFavoriteDto: CreateInvitationDto) {
    return this.invitationService.create(createFavoriteDto);
  }

  @Get()
  findAll() {
    return this.invitationService.getAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.invitationService.getOne(id);
  }

  @Get('/user/:id')
  getAllByUser(@Param('id') id: string)  {
    return this.invitationService.getAllByUser(id);
  }

  @Get('/resume/:id')
  getAllByResume(@Param('id') id: string)  {
    return this.invitationService.getAllByResume(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFavoriteDto: UpdateInvitationDto) {
    return this.invitationService.update(id, updateFavoriteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.invitationService.delete(id);
  }

  
}
