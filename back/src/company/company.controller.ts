import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Get()
    async getAll() {
        return this.companyService.getAll()
    }

    @Get('search/:name')
    async findByName(@Param('name') name: string) {
        return this.companyService.findByName(name)
    }

    @Get(':id')
    async getOne(@Param('id') id:string) {
        return this.companyService.getOne(id)
    }

    @Post() 
    async create(@Body() dto: CreateCompanyDto) {
        return this.companyService.create(dto)
    }

    @Put(':id')
    async update(@Param('id') id:string, @Body() dto:UpdateCompanyDto) {
        return this.companyService.update(id, dto)
    }

    @Delete(':id')
    async deleteCompany(@Param('id') id: string): Promise<void> {
      await this.companyService.delete(id);
    }

    @Get('user/:id')
    async getAllbyUser(@Param('id') id:string) {
        return this.companyService.getAllbyUser(id)
    }
}
