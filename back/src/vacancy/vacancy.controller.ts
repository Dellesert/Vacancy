import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { VacancyService } from './vacancy.service';
import { CreateVacancyDto } from './dto/create-vacancy.dto';
import { UpdateVacancyDto } from './dto/update-vacancy.dto';

@Controller('vacancy')
export class VacancyController {
    constructor(private readonly vacancyService: VacancyService ) {}

    @Get()
    async getAll(@Query('limit', ParseIntPipe) limit: number) {
        return this.vacancyService.getAll(limit)
    }

    @Get('search/:name')
    async findByName(@Param('name') name: string) {
        return this.vacancyService.findByName(name)
    }

    @Get('search/advanced/:salary/:name')
    async findBySalary(@Param('salary') salary: number, @Param('name') name: string) {
        return this.vacancyService.findBySalary(salary, name)
    }

    @Get(':id')
    async getOne(@Param('id') id:string) {
        return this.vacancyService.getOne(id)
    }


    @Post() 
    async create(@Body() dto: CreateVacancyDto) {
        return this.vacancyService.create(dto)
    }

    @Put(':id')
    async update(@Param('id') id:string, @Body() dto:UpdateVacancyDto) {
        return this.vacancyService.update(id, dto)
    }

    @Delete(':id')
    async delete(@Param('id') id:string) {
        return this.vacancyService.delete(id)
    }

    @Get('user/:id')
    async getAllbyUser(@Param('id') id:string) {
        return this.vacancyService.getAllbyUser(id)
    }

    
}
