import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { ReservationController } from './reservation.controller';
import { ReservationRepo } from './reservation.repository';
import { ReservationService } from './reservation.service';

@Module({
  imports: [TypeOrmModule.forFeature([ReservationRepo]), AuthModule],
  providers: [ReservationService],
  controllers: [ReservationController],
})
export class ReservationModule {}
