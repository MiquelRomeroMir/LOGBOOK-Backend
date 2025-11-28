import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { CreateReservationDto } from '../Reservation/dto/create-reservation.dto';

@Injectable()
export class ReservationService {
  constructor(
    @Inject('SUPABASE_CLIENT') private readonly supabase: SupabaseClient,
  ) {}

    async create(dto: CreateReservationDto) {
    // 1. Agafem la duració del servei
    const { data: service, error: serviceError } = await this.supabase
      .from('service')
      .select('duration')
      .eq('service_id', dto.service_id)
      .single();

    if (serviceError || !service) {
      throw new BadRequestException(
        "No s'ha pogut obtenir la duració del servei",
      );
    }

    const durationMinutes = service.duration as number;

    // 2. Calculem l’interval de la nova reserva
    const start = new Date(dto.reservation_date as any); // dto.reservation_date ve com string normalment
    if (Number.isNaN(start.getTime())) {
      throw new BadRequestException('Data de reserva no vàlida');
    }

    const durationMs = durationMinutes * 60 * 1000 - 1;
    const end = new Date(start.getTime() + durationMs);

    // Qualsevol reserva que pugui solapar ha d’estar com a màxim
    // "duration" minuts abans de l’inici i abans del final d’aquest interval.
    const windowStart = new Date(start.getTime() - durationMs);
    const windowEnd = end;

    // 3. Busquem reserves que solapin per mateix business + mateix service
    const { data: overlapping, error: overlapError } = await this.supabase
      .from('reservation')
      .select('reservation_id, reservation_date')
      .eq('business_id', dto.business_id)
      .eq('service_id', dto.service_id)
      .gte('reservation_date', windowStart.toISOString())
      .lt('reservation_date', windowEnd.toISOString());

    if (overlapError) {
      throw new BadRequestException(overlapError.message);
    }

    if (overlapping && overlapping.length > 0) {
      // Exemple: reserva existent a les 16:00 de 30 min → bloqueja fins les 16:30
      throw new BadRequestException(
        'Aquest servei d’aquest negoci ja està reservat en aquest interval horari. Tria una altra hora.',
      );
    }

    // 4. Si no hi ha conflictes, creem la reserva
    const { data, error } = await this.supabase
      .from('reservation')
      .insert([dto])
      .select()
      .single();

    if (error) {
      throw new BadRequestException(error.message);
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
