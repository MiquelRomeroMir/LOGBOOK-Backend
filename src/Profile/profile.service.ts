import { Injectable, Inject } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { CreateProfileDto } from './dto/create-profile.dto';
import { Profile } from './profile.entity';

@Injectable()
export class ProfileService {
  constructor(@Inject('SUPABASE_CLIENT') private supabase: SupabaseClient) {}

    async createProfile(createProfileDto: CreateProfileDto): Promise<Profile> {
      const avatarUrl =
        createProfileDto.avatarUrl ??
        'https://altvolzamkcqwmsmxvxk.supabase.co/storage/v1/object/public/User_avatars/profile-vector.jpg';

      const { data, error } = await this.supabase
        .from('profile')
        .insert([
          {
            user_id: createProfileDto.user_id,
            name: createProfileDto.name,
            email: createProfileDto.email,
            avatarUrl: avatarUrl,   // 👈 nom de columna real a BD
          },
        ])
        .select('*')
        .single();

      if (error) {
        throw new Error(error.message);
      }

      const profile = new Profile();
      profile.user_id = data.user_id;
      profile.name = data.name;
      profile.email = data.email;
      profile.avatarUrl = data.avatarUrl;
      return profile;
    }

  async getProfileReservations(ProfileId: string) {
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
      .eq('Profile_id', ProfileId)
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
