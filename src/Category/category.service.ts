import { Injectable, Inject } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class CategoryService {
  constructor(@Inject('SUPABASE_CLIENT') private supabase: SupabaseClient) { }

  async getCategoriesWithImages() {
    const { data, error } = await this.supabase
      .from('category')
      .select('name, image_url');

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }

  async getCategories() {
    const { data, error } = await this.supabase
      .from('category')
      .select('id, name, image_url');

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }
  async getBusinessesByCategory(categoryId: number) {
    const { data, error } = await this.supabase
      .from('business')
      .select('*')
      .eq('category_id', categoryId);

    if (error) throw new Error(error.message);
    return data;
  }


  async getServicesByCategory(id: number) {
    const { data, error } = await this.supabase
      .from('business_service')
      .select(`
        service_id,
        name,
        description,
        price,
        duration_min,
        business:business_id (
          business_id,
          name,
          category_id
        )
      `)
      .eq('business.category_id', id); // filtre per categoria via relació

    if (error) throw new Error(error.message);
    return data;
  }

}
