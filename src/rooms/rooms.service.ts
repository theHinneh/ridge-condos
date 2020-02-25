import { Storage } from '@google-cloud/storage';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../auth/auth.entity';
import { GCSDto } from './gcs.dto';
import { RoomsDto } from './rooms.dto';
import { Rooms } from './rooms.entity';
import { RoomsRepo } from './rooms.repository';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(RoomsRepo) private readonly roomsRepo: RoomsRepo,
  ) {}

  async createRoom(user: User, profileDto: RoomsDto, images: GCSDto) {
    return this.roomsRepo.createRoom(profileDto, user, await images);
  }

  getRoom() {
    return this.roomsRepo.getRooms();
  }

  async getRoomById(id: number) {
    const found = await this.roomsRepo.findOne({
      where: { id },
    });
    if (!found) {
      throw new NotFoundException(`Room with ID "${id}" not found`);
    }
    return found;
  }

  async updateRoom(
    id: number,
    update: RoomsDto,
    images: GCSDto,
    user: User,
  ): Promise<Rooms> {
    const room = await this.getRoomById(id);
    const imageLinks: any = await images;

    const storage = new Storage({
      keyFilename: process.env.GCS_KEYFILE,
    });

    const oldImagePaths = [];
    const newImagePaths = [];

    imageLinks.filter(p => {
      newImagePaths.push(p);
    });
    room.images.filter(p => {
      oldImagePaths.push(p);
    });

    newImagePaths.forEach(async p => {
      if (oldImagePaths.indexOf(p) === -1) {
        await storage
          .bucket(process.env.GCS_BUCKET)
          .file(p.filename)
          .delete();
        // .catch(err => console.log(err.message));
      }
    });

    room.roomNumber = update.roomNumber;
    room.category = update.category;
    room.description = update.description;
    room.price = update.price;
    room.status = update.status;
    room.children = update.children;
    room.adult = update.adult;
    room.user = user;

    try {
      newImagePaths.length === 0
        ? (room.images = oldImagePaths)
        : (room.images = newImagePaths);

      await room.save();
      delete room.user;

      return room;
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  async deleteRoom(id: number) {
    const result = await this.roomsRepo.delete({ id });
    if (result.affected === 0) {
      throw new NotFoundException(`Reminder with ID "${id}" not found`);
    }
  }

  // customersGetRent() {
  //   return this.profileRepo.getAllRents();
  // }
}
