import {
  Entity, PrimaryGeneratedColumn, Column, ManyToOne,
  OneToMany, JoinColumn, CreateDateColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Topic } from '../../topics/entities/topic.entity';
import { Exercise } from '../../exercises/entities/exercise.entity';
import { ForumAttachment } from './forum-attachment.entity';

@Entity('forum_posts')
export class ForumPost {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Topic)
  @JoinColumn({ name: 'topic_id' })
  topic: Topic;

  @ManyToOne(() => Exercise, { nullable: true })
  @JoinColumn({ name: 'exercise_id' })
  exercise: Exercise;

  @ManyToOne(() => ForumPost, (post) => post.replies, { nullable: true })
  @JoinColumn({ name: 'parent_id' })
  parent: ForumPost;

  @OneToMany(() => ForumPost, (post) => post.parent)
  replies: ForumPost[];

  @OneToMany(() => ForumAttachment, (a) => a.post, { cascade: true })
  attachments: ForumAttachment[];

  @Column({ type: 'text' })
  content: string;

  @CreateDateColumn()
  created_at: Date;
}
