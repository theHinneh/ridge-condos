import { User } from '../auth/auth.entity';
export class ReservationDto {
  name: string;
  roomNumber: string;
  reservationDate: Date;
  exitDate: Date;
  children: number;
  adult: number;
  user: User;
}
