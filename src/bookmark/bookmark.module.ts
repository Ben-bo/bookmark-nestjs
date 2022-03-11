import { Module } from '@nestjs/common';
import { BookmarkController } from './bookmark.controller';
import { BookmarkService } from './bookmark.service';
import { BookmarkProvider } from './bookmarks.providers';

@Module({
  controllers: [BookmarkController],
  providers: [BookmarkService, ...BookmarkProvider],
})
export class BookmarkModule {}
