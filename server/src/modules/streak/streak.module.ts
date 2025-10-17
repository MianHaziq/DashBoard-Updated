import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Streak } from './streak.model';
import { StreakService } from './streak.service';
import { StreakController } from './streak.controller';
import { JwtAuthGuard } from '../../common/guards/auth.guard';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    SequelizeModule.forFeature([Streak]),
    JwtModule.register({
      secret: process.env.JWT_SECRET ?? 'default_secret',
    }),
  ],
  controllers: [StreakController],
  providers: [StreakService, JwtAuthGuard],
})
export class StreakModule {}
