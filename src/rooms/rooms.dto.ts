import { Entity } from 'typeorm';
import { Status } from './status.enum';

@Entity()
export class RoomsDto {
  category: string;
  price: number;
  description: string;
  roomNumber: string;
  children: number;
  adult: number;
  status: Status;
}
