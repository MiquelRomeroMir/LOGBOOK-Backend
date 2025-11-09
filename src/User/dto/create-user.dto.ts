import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, MinLength, IsOptional, IsInt, IsUrl } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @ApiProperty({
    description: 'Full name of the user',
    example: 'John Doe',
  })
  name: string;

  @IsEmail()
  @ApiProperty({
    description: 'Email of the user, must be unique',
    example: 'john.doe@example.com',
  })
  email: string;

  @IsString()
  @MinLength(6)
  @ApiProperty({
    description: 'Password for the user, minimum 6 characters',
    default: 'strongPassword123',
  })
  password: string;

  @IsOptional()
  @IsInt()
  @ApiProperty({
    description: 'Optional ID of the business the user belongs to',
    default: 1,
    required: false,
  })
  business_id?: number;

  @IsOptional()
  @IsUrl()
  @ApiProperty({
    description: 'Optional avatar URL for the user. Defaults to the generic profile image if not provided.',
    default: 'https://altvolzamkcqwmsmxvxk.supabase.co/storage/v1/object/public/user_avatars/profile-vector.jpg',
    required: false,
  })
  avatarUrl?: string;
}
