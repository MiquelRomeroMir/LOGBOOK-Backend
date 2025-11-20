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
      .insert([dto]) // user_id, business_id, reservation_date
      .select();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }
}
