import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from '../src/auth/auth.entity';
import { Rooms } from '../src/rooms/rooms.entity';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  username: 'root',
  password: 'theHinneh',
  port: 3306,
  entities: [User, Rooms],
  database: 'ridge-condos',
  synchronize: true,
};