import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { GetUser } from '../auth/costume-decorator/getUser.decorator';
import { JwtGuard } from '../auth/guard/jwt.guard';
import { BookmarkService } from './bookmark.service';
import { BookmarkDto } from './dto/bookmark.dto';
import { EditBookmarkDto } from './dto/edit-bookmark.dto';

@UseGuards(JwtGuard)
@Controller('bookmarks')
export class BookmarkController {
  constructor(private bookmarkService: BookmarkService) {}

  @Get()
  async getAll(@GetUser('id') userId: number) {
    return this.bookmarkService.getAll(userId);
  }

  @Get(':id')
  async getById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) bookmarkId: number,
  ) {
    return this.bookmarkService.getById(userId, bookmarkId);
  }
  @Post()
  async create(@GetUser('id') userId: number, @Body() bookmark: BookmarkDto) {
    return this.bookmarkService.create(userId, bookmark);
  }
  @Patch(':id')
  async updateData(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) bookmarkId: number,
    @Body() bookmark: EditBookmarkDto,
  ) {
    return this.bookmarkService.updateData(userId, bookmarkId, bookmark);
  }
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete()
  async destroy(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) bookmarkId: number,
  ) {
    return this.bookmarkService.destroy(userId, bookmarkId);
  }
}
