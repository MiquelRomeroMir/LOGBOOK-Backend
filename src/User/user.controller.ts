import {
    Controller,
    Post,
    Body,
    UseGuards,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import {
    ApiBearerAuth,
    ApiOperation,
    ApiTags,
} from '@nestjs/swagger';
import { UserService } from './user.service';



@ApiBearerAuth()
@ApiTags('User')
@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService,
    ) {}

        @Post('/1.0/update')
    @ApiOperation({ summary: 'Requires an organization admin token. Updates a challenge template.' })
    @UsePipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
        }),
    )
    async updateChallengeTemplate() {
        return true;
    }
}