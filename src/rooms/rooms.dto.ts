import { Entity } from 'typeorm';
import { Status } from './status.enum';

@Entity()
export class RoomsDto {
  category: string;
  price: number;
  duration: string;
  status: Status;
}
