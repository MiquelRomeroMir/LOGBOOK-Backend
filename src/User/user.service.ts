import { Injectable, Inject } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(@Inject('SUPABASE_CLIENT') private supabase: SupabaseClient) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {

    const avatarUrl =
      createUserDto.avatarUrl ??
      'https://altvolzamkcqwmsmxvxk.supabase.co/storage/v1/object/public/user_avatars/profile-vector.jpg';
    
    const { data, error } = await this.supabase
      .from('user')
      .insert([
        {
          name: createUserDto.name,
          email: createUserDto.email,
          password: createUserDto.password,
          avatarUrl,
        },
      ])
      .select()
      .single();

    if (error) throw new Error(error.message);

    return data as User;
  }

  async getUserReservations(userId: number) {
    const { data, error } = await this.supabase
      .from('reservation')
      .select(
        `
        reservation_id,
        reservation_date,
        business:business_id (
          business_id,
          name,
          images
        )
      `,
      )
      .eq('user_id', userId)
      .order('reservation_date', { ascending: true });

    if (error) {
      throw new Error(error.message);
    }

    return (data ?? []).map((reservation: any) => ({
    reservation_id: reservation.reservation_id,
    reservation_date: reservation.reservation_date,
    business_id: reservation.business?.business_id,
    business_name: reservation.business?.name,
    business_image:
      reservation.business?.images && reservation.business.images.length > 0
        ? reservation.business.images[0]
        : null,
  }));
  }
}
