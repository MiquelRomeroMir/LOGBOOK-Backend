import { Injectable, Inject } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { CreateServiceDto } from './dto/create-service.dto';

@Injectable()
export class ServiceService {
  constructor(
    @Inject('SUPABASE_CLIENT') private readonly supabase: SupabaseClient
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
}