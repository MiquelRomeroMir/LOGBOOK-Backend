import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  BadRequestException,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiTags,
  ApiResponse,
} from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@ApiBearerAuth()
@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

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
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({ status: 201, description: 'User created successfully' })
  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  )
  async createUser(@Body() createUserDto: CreateUserDto) {
    try {
      
      const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

      const user = await this.userService.createUser({
        ...createUserDto,
        password: hashedPassword,
      });

      
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        avatarUrl: user.avatarUrl,
        business_id: user.business?.business_id || null,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
