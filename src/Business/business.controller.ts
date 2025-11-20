import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { BusinessService } from './business.service';
import { CreateBusinessDto } from './dto/create-business.dto';

@Controller('business')
export class BusinessController {
  constructor(private readonly businessService: BusinessService) {}

  @Post()
  async create(@Body() dto: CreateBusinessDto) {
    return this.businessService.create(dto);
  }
}