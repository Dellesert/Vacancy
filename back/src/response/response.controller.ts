import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ResponseService } from './response.service';
import { CreateResponseDto } from './dto/create-response.dto';
import { UpdateResponseDto } from './dto/update-response.dto';

@Controller('response')
export class ResponseController {
  constructor(private readonly responseService: ResponseService) {}

  @Post()
  create(@Body() createFavoriteDto: CreateResponseDto) {
    return this.responseService.create(createFavoriteDto);
  }

  @Get()
  findAll() {
    return this.responseService.getAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.responseService.getOne(id);
  }

  @Get('/user/:id')
  getAllByUser(@Param('id') id: string)  {
    return this.responseService.getAllByUser(id);
  }

  @Get('/vacancy/:id')
  getAllByVacancy(@Param('id') id: string)  {
    return this.responseService.getAllByVacancy(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFavoriteDto: UpdateResponseDto) {
    return this.responseService.update(id, updateFavoriteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.responseService.delete(id);
  }

  @Delete('user/:userId/vacancy/:vacancyId')
  async deleteByUserIdAndVacancyId(
    @Param('userId') userId: number,
    @Param('vacancyId') vacancyId: number,
  ): Promise<void> {
    return this.responseService.deleteByUserIdAndVacancyId(userId, vacancyId);
  }
}
