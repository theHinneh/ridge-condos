import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../auth/auth.entity';

@Entity()
export class Reservation extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  children: number;

  @Column()
  adult: number;

  @Column()
  reservationDate: Date;

  @Column()
  exitDate: Date;

  @Column()
  roomNumber: string;

  @Column()
  name: string;

  @ManyToOne(
    type => User,
    user => user.reservation,
    { eager: false },
  )
  user: User;
}
