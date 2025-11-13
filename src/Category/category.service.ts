import { Injectable, Inject } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class CategoryService {
  constructor(@Inject('SUPABASE_CLIENT') private supabase: SupabaseClient) {}

  async getCategories() {
    const { data, error } = await this.supabase
      .from('category')
      .select('name, image_url');

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }
}
