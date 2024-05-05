import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { ApplicantService } from './applicant.service';
import { CreateApplicantDto } from './dto/create-applicant.dto';
import { UpdateApplicantDto } from './dto/update-applicant.dto';

@Controller('applicant')
export class ApplicantController {
  constructor(private readonly applicantService: ApplicantService) {}

  @Get()
    async getAll() {
        return this.applicantService.getAll()
    }

    @Get(':id')
    async getOne(@Param('id') id:string) {
        return this.applicantService.getOne(id)
    }

    @Post() 
    async create(@Body() dto: CreateApplicantDto) {
        return this.applicantService.create(dto)
    }

    @Put(':id')
    async update(@Param('id') id:string, @Body() dto:UpdateApplicantDto) {
        return this.applicantService.update(id, dto)
    }

    @Delete(':id')
    async delete(@Param('id') id:string) {
        return this.applicantService.delete(id)
    }

    @Get('user/:id')
    async getAllbyUser(@Param('id') id:string) {
        return this.applicantService.getByUser(id)
    }
}
