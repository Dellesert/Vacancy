import { Module } from '@nestjs/common';
import { ResponseService } from './response.service';
import { ResponseController } from './response.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResponseEntity } from './entities/response.entity';

@Module({
  controllers: [ResponseController],
  providers: [ResponseService],
  imports: [TypeOrmModule.forFeature([ResponseEntity])]
})
export class ResponseModule {}
