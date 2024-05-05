import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { UpdateFavoriteDto } from './dto/update-favorite.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FavoriteEntity } from './entities/favorite.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FavoriteService {
  constructor(@InjectRepository(FavoriteEntity) private readonly favoriteRepository: Repository<FavoriteEntity>) {
  }

  async getAll(): Promise<FavoriteEntity[]> {
      return this.favoriteRepository.find()
  }

  async getOne(id: string): Promise<FavoriteEntity>  {
      return this.favoriteRepository.findOne({
          where: {
              id: Number(id),
              
          }
      })
  }

  async getAllByUser(id: string)  {
    const favorite = await this.favoriteRepository.find({
      relations: ['vacancy'],
      where: {
          userId: Number(id),
          
      }
  })
  return favorite
}

async CountByVacancy(id: string)  {
    const favorite = await this.favoriteRepository.count({
      relations: ['user', 'applicant'],
      where: {
          vacancyId: Number(id),
          
      }
  })
  return favorite
}


  async create(dto: CreateFavoriteDto): Promise<FavoriteEntity>  {
     const user = this.favoriteRepository.create(dto)
     return this.favoriteRepository.save(user)
  }

  async update(id: string, dto: UpdateFavoriteDto): Promise<FavoriteEntity>  {
      const user = await this.getOne(id)
      user.userId = dto.userId
      user.vacancyId = dto.vacancyId
      return this.favoriteRepository.save(user)
  }

  async delete(id: string): Promise<void>  {
      await this.favoriteRepository.delete({id: Number(id)})
  }

  async deleteByUserIdAndVacancyId(userId: number, vacancyId: number): Promise<void> {
    const favorite = await this.favoriteRepository.findOne({ where: { userId, vacancyId } });
    if (!favorite) {
      throw new NotFoundException(`Favorite with userId ${userId} and vacancyId ${vacancyId} not found`);
    }
    await this.favoriteRepository.delete(favorite.id);
  }
}
