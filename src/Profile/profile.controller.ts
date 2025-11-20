import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  BadRequestException,
  Param,
  Get,
  ParseIntPipe,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiTags,
  ApiResponse,
} from '@nestjs/swagger';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import * as bcrypt from 'bcrypt';
import { Profile } from './profile.entity';

@ApiBearerAuth()
@ApiTags('Profile')
@Controller('profile')
export class ProfileController {
  constructor(private readonly ProfileService: ProfileService) {}

  @Post('/1.0/update')
  @ApiOperation({ summary: 'Update a challenge template (dummy endpoint)' })
  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  )
  async updateChallengeTemplate() {
    return true;
  }

    @Post('/1.0/create')
  @ApiOperation({ summary: 'Create a new Profile' })
  @ApiResponse({ status: 201, description: 'Profile created successfully' })
  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  )
  async createProfile(@Body() createProfileDto: CreateProfileDto) {
    try {
      const profile = await this.ProfileService.createProfile(createProfileDto);
      return profile;  // o bé pots mapar-ho a un DTO si vols
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }


  // 🔹 GET /Profiles/:id/reservations
  @Get('/1.0/:id/reservations')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obtenir totes les reserves d’un usuari' })
  async getProfileReservations(@Param('id') id: string) {
    const reservations = await this.ProfileService.getProfileReservations(id);
    return reservations;
  }
}
