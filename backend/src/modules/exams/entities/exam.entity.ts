import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { Topic } from '../../topics/entities/topic.entity';
import { User } from '../../users/entities/user.entity';
import { ExamQuestion } from './exam-question.entity';

@Entity('exams')
export class Exam {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Topic)
  @JoinColumn({ name: 'topic_id' })
  topic: Topic;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'created_by' })
  created_by: User;

  @Column()
  title: string;

  @Column({ default: false })
  is_adaptive: boolean;

  @Column({ nullable: true })
  time_limit: number;

  @Column({ default: true })
  lock_screen: boolean;

  @Column({ default: false })
  randomize_order: boolean;

  @OneToMany(() => ExamQuestion, (q) => q.exam, { cascade: true })
  questions: ExamQuestion[];

  @CreateDateColumn()
  created_at: Date;
}
