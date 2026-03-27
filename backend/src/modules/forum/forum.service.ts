import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { ForumPost } from './entities/forum-post.entity';
import { ForumAttachment, AttachmentType } from './entities/forum-attachment.entity';
import { User, UserRole } from '../users/entities/user.entity';

@Injectable()
export class ForumService {
  constructor(
    @InjectRepository(ForumPost) private postsRepo: Repository<ForumPost>,
    @InjectRepository(ForumAttachment) private attachmentsRepo: Repository<ForumAttachment>,
  ) {}

  async findAll(filters: { topicId?: string; exerciseId?: string }): Promise<ForumPost[]> {
    const query = this.postsRepo.createQueryBuilder('post')
      .leftJoinAndSelect('post.user', 'user')
      .leftJoinAndSelect('post.topic', 'topic')
      .leftJoinAndSelect('post.exercise', 'exercise')
      .leftJoinAndSelect('post.attachments', 'attachments')
      .where('post.parent IS NULL')
      .orderBy('post.created_at', 'DESC');

    if (filters.topicId) query.andWhere('topic.id = :topicId', { topicId: filters.topicId });
    if (filters.exerciseId) query.andWhere('exercise.id = :exerciseId', { exerciseId: filters.exerciseId });

    return query.getMany();
  }

  async findOne(id: string): Promise<ForumPost> {
    const post = await this.postsRepo.findOne({
      where: { id },
      relations: ['user', 'topic', 'exercise', 'attachments', 'replies', 'replies.user', 'replies.attachments'],
    });
    if (!post) throw new NotFoundException('Post no encontrado');
    return post;
  }

  async create(data: {
    content: string;
    topicId: string;
    exerciseId?: string;
  }, user: User): Promise<ForumPost> {
    const post = this.postsRepo.create({
      content: data.content,
      user,
      topic: { id: data.topicId },
      exercise: data.exerciseId ? { id: data.exerciseId } : undefined,
    });
    return this.postsRepo.save(post) as unknown as Promise<ForumPost>;
  }

  async reply(parentId: string, content: string, user: User): Promise<ForumPost> {
    const parent = await this.findOne(parentId);
    const reply = this.postsRepo.create({
      content,
      user,
      topic: parent.topic,
      exercise: parent.exercise,
      parent,
    });
    return this.postsRepo.save(reply);
  }

  async update(id: string, content: string, user: User): Promise<ForumPost> {
    const post = await this.postsRepo.findOne({ where: { id }, relations: ['user'] });
    if (!post) throw new NotFoundException('Post no encontrado');
    if (post.user.id !== user.id) throw new ForbiddenException('No puedes editar este post');
    post.content = content;
    return this.postsRepo.save(post);
  }

  async remove(id: string, user: User): Promise<void> {
    const post = await this.postsRepo.findOne({ where: { id }, relations: ['user'] });
    if (!post) throw new NotFoundException('Post no encontrado');
    if (post.user.id !== user.id && user.role !== UserRole.ADMIN) {
      throw new ForbiddenException('No puedes eliminar este post');
    }
    await this.postsRepo.remove(post);
  }

  async addAttachment(postId: string, data: { file_url: string; type: AttachmentType }): Promise<ForumAttachment> {
    const attachment = this.attachmentsRepo.create({ post: { id: postId }, ...data });
    return this.attachmentsRepo.save(attachment);
  }
}
