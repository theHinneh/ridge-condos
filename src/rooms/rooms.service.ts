import { Storage } from '@google-cloud/storage';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../auth/auth.entity';
import { RoomsDto } from './rooms.dto';
import { Rooms } from './rooms.entity';
import { RoomsRepo } from './rooms.repository';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(RoomsRepo) private readonly roomsRepo: RoomsRepo,
  ) {}

  async createRoom(user: User, profileDto: RoomsDto) {
    return this.roomsRepo.createRoom(profileDto, user);
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

  async updateRoom(id: number, update: RoomsDto, user: User): Promise<Rooms> {
    const room = await this.getRoomById(id);
    room.roomNumber = update.roomNumber;
    room.category = update.category;
    room.description = update.description;
    room.price = update.price;
    room.status = update.status;
    room.children = update.children;
    room.adult = update.adult;
    room.user = user;

    try {
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
}
