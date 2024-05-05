import { Injectable } from '@nestjs/common';
import { ResumeEntity } from './resume.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { CreateResumeDto } from './dto/create-resume.dto';
import { UpdateResumeDto } from './dto/update-resume.dto';

@Injectable()
export class ResumeService {
    constructor(@InjectRepository(ResumeEntity) private readonly resumeRepository: Repository<ResumeEntity>) {
    }

    async getAll(limit: number): Promise<ResumeEntity[]> {
        return this.resumeRepository.find({
            relations: ['applicant'],
            order: {
              date: 'DESC'
            },
            take: limit 
          });
    }

    async findByName(name: string): Promise<ResumeEntity[]> {
        return this.resumeRepository.find({
          relations: ['applicant'],
          order: {
            date: 'DESC'
          },
          where: {
            title: ILike(`%${name}%`)
          } 
        });
      }

    async getOne(id: string): Promise<ResumeEntity>  {
        return this.resumeRepository.findOne({
            where: {
                id: Number(id)
            }
            
        })
    }

    async create(dto: CreateResumeDto): Promise<ResumeEntity>  {
       const resume = this.resumeRepository.create(dto)
       return this.resumeRepository.save(resume)
    }

    async update(id: string, dto: UpdateResumeDto): Promise<ResumeEntity>  {
        const resume = await this.getOne(id)
        resume.date = dto.date
        resume.title = dto.title
        resume.description = dto.description
        resume.userId = dto.userId
        return this.resumeRepository.save(resume)
    }

    async delete(id: string): Promise<void>  {
        await this.resumeRepository.delete({id: Number(id)})
    }

    async getAllbyUser(id: string): Promise<ResumeEntity[]> {
        return this.resumeRepository.find({
            where: {
                userId: Number(id)
            }
        })
    }
}
