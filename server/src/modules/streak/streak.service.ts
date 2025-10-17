import { Injectable } from '@nestjs/common';
import { Streak } from './streak.model';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class StreakService {
  private isValidUUID(id: string): boolean {
    return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id);
  }

  async getUserStreakCount(userId: string) {
    if (!userId || !this.isValidUUID(userId)) {
      throw new Error('Unauthorized: Invalid user ID');
    }

    const streak = await Streak.findOne({
      where: { userId },
      order: [['createdAt', 'DESC']],
    });

    if (!streak) {
      const randomCount = Math.floor(Math.random() * 10) + 1;
      const newStreak = await Streak.create({
        id: uuidv4(),
        userId,
        count: randomCount,
      });
      return { count: newStreak.count };
    }

    return { count: streak.count };
  }
}
