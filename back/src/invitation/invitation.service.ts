import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateInvitationDto } from './dto/create-invitation.dto';
import { UpdateInvitationDto } from './dto/update-invitation.dto';
import { Repository } from 'typeorm';
import { InvitationEntity } from './entities/invitation.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class InvitationService {
  constructor(@InjectRepository(InvitationEntity) private readonly responseRepository: Repository<InvitationEntity>) {

  }
  async getAll(): Promise<InvitationEntity[]> {
    return this.responseRepository.find()
}

async getOne(id: string): Promise<InvitationEntity>  {
    return this.responseRepository.findOne({
        where: {
            id: Number(id),
            
        }
    })
}

async getAllByUser(id: string)  {
  const vacancies = await this.responseRepository.find({
    relations: ['resume'],
    where: {
        userId: Number(id),
        
    }
})
return vacancies
}

async getAllByResume(id: string)  {
const vacancies = await this.responseRepository.find({
  relations: ['user'],
  where: {
    resumeId: Number(id),
      
  }
})
return vacancies
}


async create(dto: CreateInvitationDto): Promise<InvitationEntity>  {
   const user = this.responseRepository.create(dto)
   return this.responseRepository.save(user)
}

async update(id: string, dto: UpdateInvitationDto): Promise<InvitationEntity>  {
    const user = await this.getOne(id)
    user.userId = dto.userId
    user.resumeId = dto.resumeId
    return this.responseRepository.save(user)
}

async delete(id: string): Promise<void>  {
    await this.responseRepository.delete({id: Number(id)})
}


}
