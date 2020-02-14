import { BadRequestException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { User } from '../auth/auth.entity';
import { RoomsDto } from './rooms.dto';
import { Rooms } from './rooms.entity';

@EntityRepository(Rooms)
export class RoomsRepo extends Repository<Rooms> {
  async createRoom(profileDto: RoomsDto, user: User, images: any) {
    const imageLink: any = await images;
    const room = new Rooms();

    room.category = profileDto.category;
    room.duration = profileDto.duration;
    room.price = profileDto.price;
    room.status = profileDto.status;
    room.user = user;

    try {
      room.images = await imageLink;
      await room.save();
      delete room.user;
      return room;
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  async getRooms(user: User) {
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
