import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateResponseDto } from './dto/create-response.dto';
import { UpdateResponseDto } from './dto/update-response.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ResponseEntity } from './entities/response.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ResponseService {
  constructor(@InjectRepository(ResponseEntity) private readonly responseRepository: Repository<ResponseEntity>) {
  }

  async getAll(): Promise<ResponseEntity[]> {
      return this.responseRepository.find()
  }

  async getOne(id: string): Promise<ResponseEntity>  {
      return this.responseRepository.findOne({
          where: {
              id: Number(id),
              
          }
      })
  }

  async getAllByUser(id: string)  {
    const vacancies = await this.responseRepository.find({
      relations: ['vacancy'],
      where: {
          userId: Number(id),
          
      }
  })
  return vacancies
}

async getAllByVacancy(id: string)  {
  const vacancies = await this.responseRepository.find({
    relations: ['user'],
    where: {
      vacancyId: Number(id),
        
    }
})
return vacancies
}


  async create(dto: CreateResponseDto): Promise<ResponseEntity>  {
     const user = this.responseRepository.create(dto)
     return this.responseRepository.save(user)
  }

  async update(id: string, dto: UpdateResponseDto): Promise<ResponseEntity>  {
      const user = await this.getOne(id)
      user.userId = dto.userId
      user.vacancyId = dto.vacancyId
      return this.responseRepository.save(user)
  }

  async delete(id: string): Promise<void>  {
      await this.responseRepository.delete({id: Number(id)})
  }

  async deleteByUserIdAndVacancyId(userId: number, vacancyId: number): Promise<void> {
    const favorite = await this.responseRepository.findOne({ where: { userId, vacancyId } });
    if (!favorite) {
      throw new NotFoundException(`Favorite with userId ${userId} and vacancyId ${vacancyId} not found`);
    }
    await this.responseRepository.delete(favorite.id);
  }
}
