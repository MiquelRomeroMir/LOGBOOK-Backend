import { Injectable, Inject } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { CreateReservationDto } from '../Reservation/dto/create-reservation.dto';

@Injectable()
export class ReservationService {
  constructor(
    @Inject('SUPABASE_CLIENT') private readonly supabase: SupabaseClient,
  ) {}

  async create(dto: CreateReservationDto) {
    const { data, error } = await this.supabase
      .from('reservation')
      .insert([dto])
      .select();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }

  async cancel(reservationId: number) {
    const { data, error } = await this.supabase
      .from('reservation')
      .delete()
      .eq('reservation_id', reservationId)
      .select();

    if (error) {
      throw new Error(error.message);
    }

    // data és l'array de files eliminades
    return {
      message: 'Reserva anul·lada correctament',
      deleted: data,
    };
  }
}
