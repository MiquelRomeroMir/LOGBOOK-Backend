// src/supabase/supabase.module.ts
import { Module, Global } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Global()
@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: 'SUPABASE_CLIENT',
      inject: [ConfigService],
      useFactory: (configService: ConfigService): SupabaseClient => {
        const url = configService.get<string>('EXPO_PUBLIC_SUPABASE_URL');
        const key = configService.get<string>('SUPABASE_SERVICE_ROLE_KEY');

        if (!url || !key) {
          throw new Error('Supabase URL or key is not set in .env');
        }

        return createClient(url, key);
      },
    },
  ],
  exports: ['SUPABASE_CLIENT'],
})
export class SupabaseModule {}
