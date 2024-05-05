import { Module } from '@nestjs/common';
import { InvitationService } from './invitation.service';
import { InvitationController } from './invitation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvitationEntity } from './entities/invitation.entity';

@Module({
  controllers: [InvitationController],
  providers: [InvitationService],
  imports: [TypeOrmModule.forFeature([InvitationEntity])]
})
export class InvitationModule {}
