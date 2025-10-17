import { Injectable } from '@nestjs/common';
import { Stat } from './stat.model';
import { v4 as uuidv4 } from 'uuid';

type StatCreateInput = {
  title: string;
  total: number;
  image: string;
  userId: string;
};

@Injectable()
export class StatService {
  private defaultStatsFor(userId: string): StatCreateInput[] {
    return [
      {
        title: 'Article Completed',
        total: 233,
        image: '/article.png',
        userId,
      },
      {
        title: 'Vocabulary Learned',
        total: 12344,
        image: '/dictionary.png',
        userId,
      },
      {
        title: 'Speaking Activities',
        total: 678,
        image: '/speaking.png',
        userId,
      },
    ];
  }

  async getUserStats(userId: string) {
    const existingStats = await Stat.findAll({ where: { userId } });

    if (existingStats.length === 0) {
      const defaults = this.defaultStatsFor(userId).map((s) => ({
        ...s,
        id: uuidv4(),
      }));

      await Stat.bulkCreate(defaults);
    }

    const userStats = await Stat.findAll({ where: { userId } });
    return userStats;
  }
}
