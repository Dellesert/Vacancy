import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { ResumeService } from './resume.service';
import { CreateResumeDto } from './dto/create-resume.dto';
import { UpdateResumeDto } from './dto/update-resume.dto';

@Controller('resume')
export class ResumeController {
    constructor(private readonly resumeService: ResumeService ) {}

    @Get()
    async getAll(@Query('limit', ParseIntPipe) limit: number) {
        return this.resumeService.getAll(limit)
    }

    @Get('search/:name')
    async findByName(@Param('name') name: string) {
        return this.resumeService.findByName(name)
    }

    @Get(':id')
    async getOne(@Param('id') id:string) {
        return this.resumeService.getOne(id)
    }

    @Post() 
    async create(@Body() dto: CreateResumeDto) {
        return this.resumeService.create(dto)
    }

    @Put(':id')
    async update(@Param('id') id:string, @Body() dto:UpdateResumeDto) {
        return this.resumeService.update(id, dto)
    }

    @Delete(':id')
    async delete(@Param('id') id:string) {
        return this.resumeService.delete(id)
    }

    @Get('user/:id')
    async getAllbyUser(@Param('id') id:string) {
        return this.resumeService.getAllbyUser(id)
    }
}
