import { Entity } from 'typeorm';
import { User } from '../auth/auth.entity';
import { Status } from '../rooms/status.enum';

@Entity()
export class ReservationDto {
  name: string;
  roomNumber: string;
  reservationDate: Date;
  exitDate: Date;
  children: number;
  adult: number;
  user: User;
  status: Status;
}
