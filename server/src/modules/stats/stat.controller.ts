import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { StatService } from './stat.service';
import { JwtAuthGuard } from '../../common/guards/auth.guard';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('stat')
@ApiBearerAuth()
@Controller('stats')
export class StatController {
  constructor(private readonly statService: StatService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getUserStats(@Req() req: Request, @Res() res: Response) {
    try {
      const userId = (req as any).userId;
      if (!userId) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      const stats = await this.statService.getUserStats(userId);
      return res.status(200).json(stats);
    } catch (err) {
      if (err instanceof Error) {
        console.error('getUserStats error:', err.message);
      } else {
        console.error('getUserStats unknown error:', err);
      }
      return res.status(500).json({ message: 'Server error while fetching stats' });
    }
  }
}
