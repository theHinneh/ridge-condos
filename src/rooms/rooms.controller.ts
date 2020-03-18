import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/jwt/get-user.decorator';
import { User } from '../auth/auth.entity';
import { RoomsDto } from './rooms.dto';
import { ProfileService } from './rooms.service';
// tslint:disable-next-line: no-var-requires
const MulterGoogleCloudStorage = require('multer-google-storage');

@Controller('rooms-management')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @UseGuards(AuthGuard())
  @Post()
  @UsePipes(ValidationPipe)
  async createRoom(@GetUser() user: User, @Body() profileDto: RoomsDto) {
    return this.profileService.createRoom(user, profileDto);
  }

  @Get()
  getRoom() {
    return this.profileService.getRoom();
  }

  @Patch('/:id')
  async updateRoom(
    @Param('id', ParseIntPipe) id: number,
    @Body() update: RoomsDto,
    @GetUser() user: User,
  ) {
    return this.profileService.updateRoom(id, update, user);
  }

  @Delete('/:id')
  deleteRoom(@Param('id', ParseIntPipe) id: number) {
    return this.profileService.deleteRoom(id);
  }
}
