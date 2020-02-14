import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../auth/auth.entity';
import { Status } from './status.enum';

@Entity()
export class Rooms extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  category: string;

  @Column()
  price: number;

  @Column()
  duration: string;

  @Column()
  status: Status;

  @Column({ type: 'json' })
  images: any;

  @ManyToOne(
    type => User,
    user => user.profile,
    { eager: false },
  )
  user: User;
}
