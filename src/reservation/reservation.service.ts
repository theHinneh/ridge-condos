import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../auth/auth.entity';
import { ReservationDto } from './reservation.dto';
import { ReservationRepo } from './reservation.repository';

@Injectable()
export class ReservationService {
  constructor(
    @InjectRepository(ReservationRepo)
    private readonly reservationRepo: ReservationRepo,
  ) {}

  async createReservation(user: User, reservationDto: ReservationDto) {
    return this.reservationRepo.createReservation(reservationDto, user);
  }

  async getReservations() {
    return this.reservationRepo.getReservations();
  }

  async getReservationById(id: number) {
    const found = await this.reservationRepo.findOne(id);
    if (!found) {
      throw new NotFoundException(`Reservation with id ${id} not found`);
    }
    return found;
  }

  async updateReservation(id: number, update: ReservationDto, user: User) {
    const reservation = await this.getReservationById(id);
    reservation.name = update.name;
    reservation.reservationDate = update.reservationDate;
    reservation.exitDate = update.exitDate;
    reservation.roomNumber = update.roomNumber;
    reservation.children = update.children;
    reservation.adult = update.adult;
    reservation.user = update.user;

    try {
      await reservation.save();
      delete reservation.user;
      return reservation;
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  async deleteReservation(id: number) {
    const result = await this.reservationRepo.delete({ id });
    if (result.affected === 0) {
      throw new NotFoundException(`Reservation with ID ${id} not found`);
    }
  }
}
