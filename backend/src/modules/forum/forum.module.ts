import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ForumService } from './forum.service';
import { ForumController } from './forum.controller';
import { ForumPost } from './entities/forum-post.entity';
import { ForumAttachment } from './entities/forum-attachment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ForumPost, ForumAttachment])],
  providers: [ForumService],
  controllers: [ForumController],
})
export class ForumModule {}
