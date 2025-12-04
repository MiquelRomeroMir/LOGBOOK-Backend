import { Controller, Post, Body, Delete, Param, ParseIntPipe } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { ReservationService } from './reservation.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { ReviewReservationDto } from './dto/review-reservation.dto';

@ApiTags('Reservation')
@Controller('reservation')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Post()
  async create(@Body() dto: CreateReservationDto) {
    return this.reservationService.create(dto);
  }

  // 🔹 Nou endpoint per puntuar una reserva
  @Post(':id/review')
  @ApiBody({ type: ReviewReservationDto })
  async reviewReservation(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: ReviewReservationDto,
  ) {
    const review = Number(body.review);
    return this.reservationService.addReview(id, review);
  }

  @Delete(':id')
  async cancel(@Param('id', ParseIntPipe) id: number) {
    return this.reservationService.cancel(id);
  }
}
