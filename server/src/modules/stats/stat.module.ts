import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Stat } from './stat.model';
import { StatService } from './stat.service';
import { StatController } from './stat.controller';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [SequelizeModule.forFeature([Stat]),
JwtModule.register({
      secret: process.env.JWT_SECRET ?? 'default_secret',
    }),
],
  providers: [StatService],
  controllers: [StatController],
  exports: [StatService],
})
export class StatModule {}
