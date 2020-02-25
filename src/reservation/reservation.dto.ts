import { User } from '../auth/auth.entity';
export class ReservationDto {
  name: string;
  numOfPeople: number;
  reservationDate: Date;
  exitDate: Date;
  roomNumber: string;
  user: User;
}
