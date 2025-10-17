import { Injectable } from '@nestjs/common';
import { Article } from './article.model';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ArticleService {
  async getUserArticles(userId: string) {
    let existing = await Article.findAll({ where: { userId } });

    if (existing.length === 0) {
      const defaultArticles = [
        {
          id: uuidv4(),
          channel: 'Al Jazeera',
          url: '#',
          cimage: '/jazeera.png',
          time: '• 7 min read',
          category: '🏛️ Politics',
          catImage: '',
          level: 'ILR Level: 2-Moderate',
          levImage: '',
          title: 'جدعون ليفي: إسرائيل ليست أسدا صاعدا وإنما هي أسد مريض',
          content:
            'يرى ليفي أن مصير الحرب مرهون بنزوات رئيس أميركي “متقلب المزاج” و “ثرثار”، فإذا قرر أن يقصف إيران فقد يتحقق انتصار...',
          progress: 0,
          userId,
        },
        {
          id: uuidv4(),
          channel: 'Al Jazeera',
          url: '#',
          cimage: '/jazeera.png',
          time: '• 7 min read',
          category: '🏛️ Politics',
          catImage: '',
          level: 'ILR Level: 2-Moderate',
          levImage: '',
          title: 'جدعون ليفي: إسرائيل ليست أسدا صاعدا وإنما هي أسد مريض',
          content:
            'يرى ليفي أن مصير الحرب مرهون بنزوات رئيس أميركي “متقلب المزاج” و “ثرثار”، فإذا قرر أن يقصف إيران فقد يتحقق انتصار...',
          progress: 47,
          userId,
        },
      ];

      await Article.bulkCreate(defaultArticles);
      existing = await Article.findAll({ where: { userId } });
    }

    return existing;
  }
}
