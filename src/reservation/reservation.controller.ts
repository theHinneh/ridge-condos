import {
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
  Patch,
  Param,
  ParseIntPipe,
  Body,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { User } from '../auth/auth.entity';
import { ReservationDto } from './reservation.dto';
import { ReservationService } from './reservation.service';
import { GetUser } from 'src/auth/jwt/get-user.decorator';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard())
@Controller('reservation')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async createReservation(
    @GetUser() user: User,
    @Body() resevrationDto: ReservationDto,
  ) {
    return this.reservationService.createReservation(user, resevrationDto);
  }

  @Get()
  async getReservations() {
    return this.reservationService.getReservations();
  }

  @Patch('/:id')
  async updateReservations(
    @Param('id', ParseIntPipe) id: number,
    @Body() update: ReservationDto,
    @GetUser() user: User,
  ) {
    return this.reservationService.updateReservation(id, update, user);
  }

  @Delete('/:id')
  deleteReserVations(@Param('id', ParseIntPipe) id: number) {
    return this.reservationService.deleteReservation(id);
  }
}
