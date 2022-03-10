import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { Op } from 'sequelize';

import { BOOKMARK_REPOSITORY } from '../database/constant';
import { BookmarkDto } from './dto/bookmark.dto';
import { EditBookmarkDto } from './dto/edit-bookmark.dto';
import { Bookmark } from './entities/bookmark.entity';

@Injectable()
export class BookmarkService {
  constructor(
    @Inject(BOOKMARK_REPOSITORY) private bookmarkRepository: typeof Bookmark,
  ) {}

  async getAll(userId: number) {
    return await this.bookmarkRepository.findAll({ where: { userId } });
  }

  async getById(userId: number, bookmarkId: number) {
    return await this.bookmarkRepository.findAll({
      where: { [Op.and]: [{ userId, id: bookmarkId }] },
    });
  }

  async create(userId: number, bookmark: BookmarkDto) {
    const data = await this.bookmarkRepository.create({ userId, ...bookmark });
    return data;
  }

  async updateData(
    userId: number,
    bookmarkId: number,
    bookmark: EditBookmarkDto,
  ) {
    const dataBookmark = await this.bookmarkRepository.findOne({
      where: { id: bookmarkId },
    });
    if (!dataBookmark || dataBookmark.userId !== userId) {
      throw new ForbiddenException('Access Denied');
    }
    await this.bookmarkRepository.update(bookmark, {
      where: { [Op.and]: [{ id: bookmarkId, userId }] },
    });
    return { message: 'bookmark update successful', id: bookmarkId };
  }

  async destroy(userId: number, bookmarkId: number) {
    const dataBookmark = await this.bookmarkRepository.findOne({
      where: { id: bookmarkId },
    });
    if (!dataBookmark || dataBookmark.userId !== userId) {
      throw new ForbiddenException('Access denied');
    }
    await this.bookmarkRepository.destroy({
      where: { [Op.and]: [{ id: bookmarkId, userId }] },
    });
  }
}
