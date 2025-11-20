// create-profile.dto.ts
import { IsString, IsUUID, IsOptional } from 'class-validator';

export class CreateProfileDto {
  @IsUUID()
  user_id: string;

  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsString()
  avatarUrl?: string;
}
