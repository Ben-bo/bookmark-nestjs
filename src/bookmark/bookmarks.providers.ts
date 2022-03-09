import { BOOKMARK_REPOSITORY } from '../database/constant';
import { Bookmark } from './entities/bookmark.entity';

export const BookmarkProvider = [
  {
    provide: BOOKMARK_REPOSITORY,
    useValue: Bookmark,
  },
];
