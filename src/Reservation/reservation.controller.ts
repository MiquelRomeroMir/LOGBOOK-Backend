import { Controller, Post, Body, Delete, Param, ParseIntPipe } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { CreateReservationDto } from './dto/create-reservation.dto';

@Controller('reservation')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Post()
  async create(@Body() dto: CreateReservationDto) {
    return this.reservationService.create(dto);
  }

  @Delete(':id')
  async cancel(@Param('id', ParseIntPipe) id: number) {
    return this.reservationService.cancel(id);
  }
}
