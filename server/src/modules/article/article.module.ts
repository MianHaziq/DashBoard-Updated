import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Article } from './article.model';
import { ArticleService } from './article.service';
import { ArticleController } from './article.controller';
import { AuthModule } from '../auth/auth.module'; 
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [SequelizeModule.forFeature([Article]), AuthModule,JwtModule.register({
        secret: process.env.JWT_SECRET ?? 'default_secret',
      }),],
  providers: [ArticleService],
  controllers: [ArticleController],
   exports: [ArticleService],
})
export class ArticleModule {}
