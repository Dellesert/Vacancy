import { Injectable } from '@nestjs/common';
import { CreateApplicantDto } from './dto/create-applicant.dto';
import { UpdateApplicantDto } from './dto/update-applicant.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ApplicantEntity } from './entities/applicant.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ApplicantService {
  constructor(@InjectRepository(ApplicantEntity) private readonly companyRepository: Repository<ApplicantEntity>) {
  }
  async create(dto: CreateApplicantDto): Promise<ApplicantEntity> {
    const company = this.companyRepository.create(dto)
    return this.companyRepository.save(company)
  }

  async getAll() {
    const company = await this.companyRepository.find({ relations: ['user'] })
    return company
}

async getOne(id: string): Promise<ApplicantEntity>  {
    return this.companyRepository.findOne({
        relations: ['user'],
        where: {
            id: Number(id)
        }
    })
}


async update(id: string, dto: UpdateApplicantDto): Promise<ApplicantEntity>  {
  const applicant = await this.getOne(id)
  applicant.date = dto.date
  applicant.firstname = dto.firstname
  applicant.secondname = dto.secondname
  applicant.lastname = dto.lastname
  applicant.phone = dto.phone
  applicant.userId = dto.userId
  return this.companyRepository.save(applicant)
}

async delete(id: string): Promise<void>  {
  await this.companyRepository.delete({id: Number(id)})
}

async getByUser(id: string) {
  return this.companyRepository.findOne({
      where: {
          userId: Number(id)
      }
  })
}
}
