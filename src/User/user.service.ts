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
      .from('users')
      .insert([
        {
          name: createUserDto.name,
          email: createUserDto.email,
          password: createUserDto.password,
          business_id: createUserDto.business_id,
          avatarUrl,
        },
      ])
      .select()
      .single();

    if (error) throw new Error(error.message);

    return data as User;
  }
}
