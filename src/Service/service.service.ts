import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { CreateServiceDto } from './dto/create-service.dto';

@Injectable()
export class ServiceService {
  constructor(
    @Inject('SUPABASE_CLIENT') private readonly supabase: SupabaseClient,
  ) {}

  async create(dto: CreateServiceDto) {
    const { data, error } = await this.supabase
      .from('service')
      .insert([dto])
      .select();

    if (error) throw new Error(error.message);
    return data;
  }

  async getByBusiness(businessId: number) {
    const { data, error } = await this.supabase
      .from('service')
      .select('*')
      .eq('business_id', businessId);

    if (error) throw new Error(error.message);
    return data;
  }

  /**
   * Retorna totes les reserves d'un servei en un dia concret.
   * date ha de venir en format 'YYYY-MM-DD' (p.ex. 2025-12-01).
   */
  async getReservationsForDay(serviceId: number, date: string) {
    if (!date) {
      throw new BadRequestException('El paràmetre "date" és obligatori');
    }

    const target = new Date(date);
    if (Number.isNaN(target.getTime())) {
      throw new BadRequestException(
        'El paràmetre "date" ha de tenir format YYYY-MM-DD',
      );
    }

    // Inici i final del dia
    const startOfDay = new Date(target);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(target);
    endOfDay.setDate(endOfDay.getDate() + 1); // dia següent a les 00:00
    endOfDay.setHours(0, 0, 0, 0);

    const { data, error } = await this.supabase
      .from('reservation')
      .select('*')
      .eq('service_id', serviceId)
      .gte('reservation_date', startOfDay.toISOString())
      .lt('reservation_date', endOfDay.toISOString());

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }
}
