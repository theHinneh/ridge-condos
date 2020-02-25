import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FilesInterceptor } from '@nestjs/platform-express';
import { GetUser } from 'src/auth/jwt/get-user.decorator';
import { User } from '../auth/auth.entity';
import { GCSDto } from './gcs.dto';
import { RoomsDto } from './rooms.dto';
import { ProfileService } from './rooms.service';
// tslint:disable-next-line: no-var-requires
const MulterGoogleCloudStorage = require('multer-google-storage');

@Controller('rooms-management')
@UseGuards(AuthGuard())
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Post()
  @UseInterceptors(
    FilesInterceptor('images', 1, {
      storage: new MulterGoogleCloudStorage.storageEngine(),
    }),
  )
  @UsePipes(ValidationPipe)
  async createRoom(
    @GetUser() user: User,
    @Body() profileDto: RoomsDto,
    @UploadedFiles() images: GCSDto,
  ) {
    return this.profileService.createRoom(user, profileDto, await images);
  }

  @Get()
  getRoom() {
    return this.profileService.getRoom();
  }

  @Patch('/:id')
  @UseInterceptors(
    FilesInterceptor('images', 1, {
      storage: new MulterGoogleCloudStorage.storageEngine(),
    }),
  )
  async updateRoom(
    @Param('id', ParseIntPipe) id: number,
    @Body() update: RoomsDto,
    @UploadedFiles() images: GCSDto,
    @GetUser() user: User,
  ) {
    return this.profileService.updateRoom(id, update, await images, user);
  }

  @Delete('/:id')
  deleteRoom(@Param('id', ParseIntPipe) id: number) {
    return this.profileService.deleteRoom(id);
  }
}
