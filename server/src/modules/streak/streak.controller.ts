import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { Response, Request } from 'express';
import { StreakService } from './streak.service';
import { JwtAuthGuard } from '../../common/guards/auth.guard';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('streak')
@ApiBearerAuth()
@Controller('streak')
export class StreakController {
  constructor(private readonly streakService: StreakService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getUserStreakCount(@Req() req: Request, @Res() res: Response) {
    try {
      const userId = (req as any).userId;
      const result = await this.streakService.getUserStreakCount(userId);
      return res.status(200).json(result);
    } catch (err) {
      // ✅ Properly narrow the error type
      if (err instanceof Error && err.message.includes('Unauthorized')) {
        return res.status(401).json({ message: err.message });
      }
      console.error('getUserStreakCount error:', err);
      return res.status(500).json({ message: 'Server error' });
    }
  }
}
