import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { UpdateFavoriteDto } from './dto/update-favorite.dto';

@Controller('favorite')
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}

  @Post()
  create(@Body() createFavoriteDto: CreateFavoriteDto) {
    return this.favoriteService.create(createFavoriteDto);
  }

  @Get()
  findAll() {
    return this.favoriteService.getAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.favoriteService.getOne(id);
  }

  @Get('/user/:id')
  getAllByUser(@Param('id') id: string)  {
    return this.favoriteService.getAllByUser(id);
  }

  @Get('/vacancy/:id')
  CountByVacancy(@Param('id') id: string)  {
    return this.favoriteService.CountByVacancy(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFavoriteDto: UpdateFavoriteDto) {
    return this.favoriteService.update(id, updateFavoriteDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.favoriteService.delete(id);
  }
  
  @Delete('user/:userId/vacancy/:vacancyId')
  async deleteByUserIdAndVacancyId(
    @Param('userId') userId: number,
    @Param('vacancyId') vacancyId: number,
  ): Promise<void> {
    return this.favoriteService.deleteByUserIdAndVacancyId(userId, vacancyId);
  }

  
}
