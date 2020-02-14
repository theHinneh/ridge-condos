import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { ProfileController } from './rooms.controller';
import { RoomsRepo } from './rooms.repository';
import { ProfileService } from './rooms.service';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([RoomsRepo]), AuthModule],
  providers: [ProfileService],
  controllers: [ProfileController],
})
export class ProfileModule {}
