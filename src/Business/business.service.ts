import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { CreateBusinessDto } from '../Business/dto/create-business.dto';

@Injectable()
export class BusinessService {
  constructor(
    @Inject('SUPABASE_CLIENT') private readonly supabase: SupabaseClient
  ) {}

  async create(dto: CreateBusinessDto) {
    const { data, error } = await this.supabase
      .from('business')
      .insert([dto])
      .select(); 

    if (error) throw new Error(error.message);
    return data;
  }
  async getRandom(limit = 5) {
    const { data, error } = await this.supabase
      .from('business')
      .select('*')
      .order('business_id', { ascending: false }); // primer ordenes per id, opcional
    if (error) throw new Error(error.message);

    // Escollir 5 aleatoris
    const shuffled = data.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, limit);
  }

  async getById(id: number) {
    const { data, error } = await this.supabase
      .from('business')
      .select('*')
      .eq('business_id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116' || error.message.includes('Row not found')) {
        throw new NotFoundException('Business not found');
      }
      throw new Error(error.message);
    }

    return data;
  }
}