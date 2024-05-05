import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { VacancyEntity } from './vacancy.entity';
import { ILike, Like, MoreThan, MoreThanOrEqual, Repository } from 'typeorm';
import { CreateVacancyDto } from './dto/create-vacancy.dto';
import { UpdateVacancyDto } from './dto/update-vacancy.dto';

@Injectable()
export class VacancyService {
    constructor(@InjectRepository(VacancyEntity) private readonly vacancyRepository: Repository<VacancyEntity>) {
    }



    async getAll(limit: number): Promise<VacancyEntity[]> {
        return this.vacancyRepository.find({
          relations: ['company', 'favorites', 'responses'],
          order: {
            date: 'DESC'
          },
          take: limit 
        });
      }

      async findByName(name: string): Promise<VacancyEntity[]> {
        return this.vacancyRepository.find({
          relations: ['company', 'favorites', 'responses'],
          order: {
            date: 'DESC'
          },
          where: {
            title: ILike(`%${name}%`)
          } 
        });
      }

      async findBySalary(salary: number, name: string): Promise<VacancyEntity[]> {
        return this.vacancyRepository.find({
          relations: ['company', 'favorites', 'responses'],
          order: {
            date: 'DESC'
          },
          where: {
            salary: MoreThanOrEqual(salary),
            title: ILike(`%${name}%`)
          } 
        });
      }


    async getOne(id: string): Promise<VacancyEntity>  {
        return this.vacancyRepository.findOne({
            relations: ['company'],
            where: {
                id: Number(id)
            }
        })
    }

    async create(dto: CreateVacancyDto): Promise<VacancyEntity>  {
       const vacancy = this.vacancyRepository.create(dto)
       return this.vacancyRepository.save(vacancy)
    }

    async update(id: string, dto: UpdateVacancyDto): Promise<VacancyEntity>  {
        const vacancy = await this.getOne(id)
        vacancy.date = dto.date
        vacancy.title = dto.title
        vacancy.description = dto.description
        vacancy.userId = dto.userId
        return this.vacancyRepository.save(vacancy)
    }

    async delete(id: string): Promise<void>  {
        await this.vacancyRepository.delete({id: Number(id)})
    }

    async getAllbyUser(id: string): Promise<VacancyEntity[]> {
        return this.vacancyRepository.find({
            relations: ['company', 'favorites', 'responses'],
            where: {
                userId: Number(id)
            }
        })
    }

   
}
