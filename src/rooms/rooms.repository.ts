import { BadRequestException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { User } from '../auth/auth.entity';
import { RoomsDto } from './rooms.dto';
import { Rooms } from './rooms.entity';

@EntityRepository(Rooms)
export class RoomsRepo extends Repository<Rooms> {
  async createRoom(profileDto: RoomsDto, user: User) {
    const room = new Rooms();

    room.category = profileDto.category;
    room.description = profileDto.description;
    room.price = profileDto.price;
    room.status = profileDto.status;
    room.roomNumber = profileDto.roomNumber;
    room.children = profileDto.children;
    room.adult = profileDto.adult;
    room.user = user;

    try {
      await room.save();
      delete room.user;
      return room;
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  async getRooms() {
    const query = this.createQueryBuilder('rooms');
    const rooms = await query.getMany();
    return rooms;
  }

  // async getAllrooms() {
  //   const query = this.createQueryBuilder('rooms');
  //   const rooms = await query.getMany();
  //   return rooms;
  // }
}
