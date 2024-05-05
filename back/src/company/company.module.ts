import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyEntity } from './entities/company.entity';
import { VacancyService } from 'src/vacancy/vacancy.service';
import { VacancyEntity } from 'src/vacancy/vacancy.entity';

@Module({
  controllers: [CompanyController],
  providers: [CompanyService, VacancyService],
  imports: [TypeOrmModule.forFeature([CompanyEntity, VacancyEntity])],
  exports: [CompanyService]
})
export class CompanyModule {}
