import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards, Request } from '@nestjs/common';
import { ForumService } from './forum.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { AttachmentType } from './entities/forum-attachment.entity';

@Controller('forum/posts')
@UseGuards(JwtAuthGuard)
export class ForumController {
  constructor(private forumService: ForumService) {}

  @Get()
  findAll(@Query('topicId') topicId?: string, @Query('exerciseId') exerciseId?: string) {
    return this.forumService.findAll({ topicId, exerciseId });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.forumService.findOne(id);
  }

  @Post()
  create(@Body() body: { content: string; topicId: string; exerciseId?: string }, @Request() req) {
    return this.forumService.create(body, req.user);
  }

  @Post(':id/reply')
  reply(@Param('id') id: string, @Body('content') content: string, @Request() req) {
    return this.forumService.reply(id, content, req.user);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body('content') content: string, @Request() req) {
    return this.forumService.update(id, content, req.user);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    return this.forumService.remove(id, req.user);
  }

  @Post(':id/attachments')
  addAttachment(@Param('id') id: string, @Body() body: { file_url: string; type: AttachmentType }) {
    return this.forumService.addAttachment(id, body);
  }
}
