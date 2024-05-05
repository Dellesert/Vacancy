import { Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CompanyEntity } from './entities/company.entity';
import { ILike, Repository } from 'typeorm';
import { VacancyEntity } from 'src/vacancy/vacancy.entity';

@Injectable()
export class CompanyService {
  constructor(@InjectRepository(CompanyEntity) private readonly companyRepository: Repository<CompanyEntity>, @InjectRepository(VacancyEntity)
  private readonly vacancyRepository: Repository<VacancyEntity>,) {
  }
  async create(dto: CreateCompanyDto): Promise<CompanyEntity> {
    const company = this.companyRepository.create(dto)
    return this.companyRepository.save(company)
  }

  async getAll() {
    const company = await this.companyRepository.find({ relations: ['user'] })
    return company
}

async findByName(name: string): Promise<CompanyEntity[]> {
  return this.companyRepository.find({
    relations: ['user'],
    order: {
      date: 'DESC'
    },
    where: {
      title: ILike(`%${name}%`)
    } 
  });
}

async getOne(id: string): Promise<CompanyEntity>  {
    return this.companyRepository.findOne({
        relations: ['user'],
        where: {
            id: Number(id)
        }
    })
}


async update(id: string, dto: UpdateCompanyDto): Promise<CompanyEntity>  {
  const vacancy = await this.getOne(id)
  vacancy.date = dto.date
  vacancy.title = dto.title
  vacancy.description = dto.description
  vacancy.userId = dto.userId
  return this.companyRepository.save(vacancy)
}

async delete(id: string,): Promise<void>  {
  const company = await this.companyRepository.find({
    where: {
        userId: Number(id)
    }
});
  if (company) {
      // Получаем все вакансии для данной компании
      const vacancies = await this.vacancyRepository.find({ where: { companyId: Number(id) } });

      // Удаляем каждую вакансию
      for (const vacancy of vacancies) {
          await this.vacancyRepository.delete(vacancy.id);
      }
  } else {
      console.log('Company not found');
  }
}



async getAllbyUser(id: string): Promise<CompanyEntity[]> {
  return this.companyRepository.find({
      where: {
          userId: Number(id)
      }
  })
}
}
