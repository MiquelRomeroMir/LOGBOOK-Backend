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

  async getReviewStats(id: number) {
    // Agafem totes les reviews de les reserves d'aquest business
    const { data, error } = await this.supabase
      .from('reservation')
      .select('review')
      .eq('business_id', id);

    if (error) {
      throw new Error(error.message);
    }

    // Si no hi ha cap reserva → 0 i 0
    if (!data || data.length === 0) {
      return {
        business_id: id,
        avg_review: 0,
        review_count: 0,
      };
    }

    // Ens quedem només amb les reviews numèriques (0–10)
    const reviews = data
      .map((row: { review: number | null }) => row.review)
      .filter((r): r is number => typeof r === 'number');

    if (reviews.length === 0) {
      return {
        business_id: id,
        avg_review: 0,
        review_count: 0,
      };
    }

    const sum = reviews.reduce((acc, r) => acc + r, 0);
    const avg = sum / reviews.length;

    return {
      business_id: id,
      avg_review: avg,
      review_count: reviews.length,
    };
  }


}