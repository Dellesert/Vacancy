import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { Public } from 'src/auth/public';

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService ) {}

    @Get()
    async getAll() {
        return this.userService.getAll()
    }

    @Get(':id')
    async getOne(@Param('id') id:string) {
        return this.userService.getOne(id)
    }

    @Get('name/:name')
    async findByLogin(@Param('name') name:string) {
        return this.userService.findByLogin(name)
    }
    @Public()
    @Get('auth/:password/:name')
    async auth(@Param('password') password:string, @Param('name') name:string) {
        return this.userService.auth(password, name)
    }
    @Public()
    @Post() 
    async create(@Body() dto: CreateUserDto) {
        return this.userService.create(dto)
    }

    @Put(':id')
    async update(@Param('id') id:string, @Body() dto:UpdateUserDto) {
        return this.userService.update(id, dto)
    }

    @Delete(':id')
    async delete(@Param('id') id:string) {
        return this.userService.delete(id)
    }
    
}
