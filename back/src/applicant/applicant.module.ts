import { Module } from '@nestjs/common';
import { ApplicantService } from './applicant.service';
import { ApplicantController } from './applicant.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicantEntity } from './entities/applicant.entity';

@Module({
  controllers: [ApplicantController],
  providers: [ApplicantService],
  imports: [TypeOrmModule.forFeature([ApplicantEntity])]
})
export class ApplicantModule {}
