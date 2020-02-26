import { BadRequestException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { User } from '../auth/auth.entity';
import { ReservationDto } from './reservation.dto';
import { Reservation } from './reservation.entity';

@EntityRepository(Reservation)
export class ReservationRepo extends Repository<Reservation> {
  async createReservation(reservationDto: ReservationDto, user: User) {
    const reservation = new Reservation();

    reservation.name = reservationDto.name;
    reservation.exitDate = reservationDto.exitDate;
    reservation.children = reservationDto.children;
    reservation.adult = reservationDto.adult;
    reservation.reservationDate = reservationDto.reservationDate;
    reservation.roomNumber = reservationDto.roomNumber;
    reservation.status = reservationDto.status;
    reservation.user = user;

    try {
      await reservation.save();
      delete reservation.user;
      return reservation;
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  async getReservations() {
    const query = this.createQueryBuilder('reservations');
    const reservations = await query.getMany();
    return reservations;
  }
}
