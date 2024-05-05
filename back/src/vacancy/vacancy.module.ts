import { Module } from '@nestjs/common';
import { VacancyController } from './vacancy.controller';
import { VacancyService } from './vacancy.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VacancyEntity } from './vacancy.entity';
import { CompanyService } from 'src/company/company.service';
import { CompanyEntity } from 'src/company/entities/company.entity';

@Module({
    controllers: [VacancyController],
    providers: [VacancyService, CompanyService],
    imports: [TypeOrmModule.forFeature([VacancyEntity, CompanyEntity])],
    exports: [VacancyService]
})
export class VacancyModule {}
