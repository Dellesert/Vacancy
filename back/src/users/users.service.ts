import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './users.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';


@Injectable()
export class UsersService {
    constructor(@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>) {
    }

    async getAll(): Promise<UserEntity[]> {
        return this.userRepository.find({
            order: {
                name: 'ASC'
            }
        })
    }

    async getOne(id: string): Promise<UserEntity>  {
        return this.userRepository.findOne({
            where: {
                id: Number(id),
                
            }
        })
    }

    async findByLogin(name: string): Promise<UserEntity | null> {
        return this.userRepository.findOne({ where: { name } });
    }

    async auth(password: string, name: string): Promise<UserEntity>  {

        return this.userRepository.findOne({
            where: {
                password: password,
                name: name.toLowerCase()
            }
        })
    }

    async create(dto: CreateUserDto): Promise<UserEntity>  {
        const hashedPassword = await bcrypt.hash(dto.password, 10);
        const user = this.userRepository.create({
            ...dto,
            name: dto.name.toLowerCase(),
            userName: dto.userName,
            password: dto.password
        });
        return this.userRepository.save(user);
    }

    async update(id: string, dto: UpdateUserDto): Promise<UserEntity>  {
        const user = await this.getOne(id)
        user.name = dto.name
        user.password = dto.password
        user.isAdmin = dto.isAdmin

        return this.userRepository.save(user)
    }

    async delete(id: string): Promise<void>  {
        await this.userRepository.delete({id: Number(id)})
    }
}
