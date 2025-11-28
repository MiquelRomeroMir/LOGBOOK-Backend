import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { ServiceService } from './service.service';
import { CreateServiceDto } from './dto/create-service.dto';

@Controller('service')
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  @Post()
  async create(@Body() dto: CreateServiceDto) {
    return this.serviceService.create(dto);
  }

  @Get('business/:businessId')
  async getByBusiness(@Param('businessId') businessId: string) {
    return this.serviceService.getByBusiness(Number(businessId));
  }
}