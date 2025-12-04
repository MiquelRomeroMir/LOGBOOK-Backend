import { Controller, Post, Body, Get, Param, ParseIntPipe } from '@nestjs/common';
import { BusinessService } from './business.service';
import { CreateBusinessDto } from './dto/create-business.dto';

@Controller('business')
export class BusinessController {
  constructor(private readonly businessService: BusinessService) {}

  @Post()
  async create(@Body() dto: CreateBusinessDto) {
    return this.businessService.create(dto);
  }

  @Get('random')
  async getRandom() {
    return this.businessService.getRandom();
  }

  @Get(':id/review-stats')
  async getReviewStats(@Param('id', ParseIntPipe) id: number) {
    return this.businessService.getReviewStats(id);
  }

  @Get(':id')
  async getById(@Param('id', ParseIntPipe) id: number) {
    return this.businessService.getById(id);
  }
}
