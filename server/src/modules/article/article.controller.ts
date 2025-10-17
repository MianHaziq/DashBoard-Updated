import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { ArticleService } from './article.service';
import { JwtAuthGuard } from '../../common/guards/auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('articles')
@ApiBearerAuth()
@Controller('articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getUserArticles(@Req() req: any) {
    const userId = (req as any).userId;
    return this.articleService.getUserArticles(userId);
  }
}
