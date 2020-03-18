import * as bcrypt from 'bcrypt';
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Rooms } from '../rooms/rooms.entity';
import { Reservation } from '../reservation/reservation.entity';

@Entity()
@Unique(['username'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  salt: string;

  @OneToMany(
    type => Rooms,
    rooms => rooms.user,
    { eager: true },
  )
  profile: Rooms;

  @OneToMany(
    type => Reservation,
    reservation => reservation.user,
    { eager: true },
  )
  reservation: Reservation;

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }
}
