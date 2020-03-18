import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from '../src/auth/auth.entity';
import { Reservation } from '../src/reservation/reservation.entity';
import { Rooms } from '../src/rooms/rooms.entity';

export const typeOrmConfig: TypeOrmModuleOptions = {
  // type: 'mysql',
  // host: 'localhost',
  // username: 'root',
  // password: 'theHinneh',
  // port: 3306,
  // entities: [User, Rooms, Reservation],
  // database: 'ridge-condos',
  // synchronize: true,

  entities: [User, Rooms, Reservation],
  type: 'postgres',
  synchronize: true,
  url:
    'postgres://qtwkzbedbqfrnd:9788dfa67104dad230ebb6f42ba87474316049614e6dd9501316aaa2c4f10eba@ec2-35-172-85-250.compute-1.amazonaws.com:5432/d7e5g0g3c0o8jh',
};
