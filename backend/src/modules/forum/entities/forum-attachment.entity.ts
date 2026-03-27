import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { ForumPost } from './forum-post.entity';

export enum AttachmentType {
  IMAGE = 'image',
  PDF = 'pdf',
  LATEX = 'latex',
}

@Entity('forum_attachments')
export class ForumAttachment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => ForumPost, (post) => post.attachments, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'post_id' })
  post: ForumPost;

  @Column()
  file_url: string;

  @Column({ type: 'enum', enum: AttachmentType })
  type: AttachmentType;
}
