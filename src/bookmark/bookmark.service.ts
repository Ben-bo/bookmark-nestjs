import { Inject, Injectable } from '@nestjs/common';
import { BOOKMARK_REPOSITORY } from '../database/constant';
import { BookmarkDto } from './dto/bookmark.dto';
import { EditBookmarkDto } from './dto/edit-bookmark.dto';
import { Bookmark } from './entities/bookmark.entity';

@Injectable()
export class BookmarkService {
  constructor(
    @Inject(BOOKMARK_REPOSITORY) private userRepository: typeof Bookmark,
  ) {}

  async getAll(userId: number) {
    //   return this.userRepository.
  }

  async getById(userId: number, bookmarkId: number) {}

  async create(userId: number, bookmark: BookmarkDto) {}

  async updateData(
    userId: number,
    bookmarkId: number,
    bookmark: EditBookmarkDto,
  ) {}

  async destroy(userId: number, bookmarkId: number) {}
}
