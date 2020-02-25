import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ReservationRepo } from './reservation.repository';
import { ReservationDto } from './reservation.dto';
import { User } from '../auth/auth.entity';

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
    reservation.exitDate = update.exitDate;
    reservation.numOfPeople = update.numOfPeople;
    reservation.reservationDate = update.reservationDate;
    reservation.roomNumber = update.roomNumber;
    reservation.user = update.user;

    try {
      await reservation.save();
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
