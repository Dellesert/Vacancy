import { Module } from '@nestjs/common';
import { ResumeController } from './resume.controller';
import { ResumeService } from './resume.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResumeEntity } from './resume.entity';

@Module({
  controllers: [ResumeController],
  providers: [ResumeService],
  imports: [TypeOrmModule.forFeature([ResumeEntity])]
})
export class ResumeModule {}
