import { BOOKMARK_REPOSITORY } from 'src/database/constant';
import { Bookmark } from './entities/bookmark.entity';

export const BookmarkProvider = [
  {
    provide: BOOKMARK_REPOSITORY,
    useValue: Bookmark,
  },
];
