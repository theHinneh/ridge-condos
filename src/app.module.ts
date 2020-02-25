import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from '../config/typeorm.config';
import { AuthModule } from './auth/auth.module';
import { ProfileModule } from './rooms/rooms.module';
import { ReservationModule } from './reservation/reservation.module';
// tslint:disable-next-line: no-var-requires
const MulterGoogleCloudStorage = require('multer-google-storage');

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    AuthModule,
    ProfileModule,
    MulterModule.registerAsync({
      useFactory: () => ({
        storage: MulterGoogleCloudStorage.storageEngine(),
      }),
    }),
    ReservationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
