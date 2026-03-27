import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Exam } from './exam.entity';
import { StudentAnswer } from './student-answer.entity';

@Entity('exam_attempts')
export class ExamAttempt {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Exam)
  @JoinColumn({ name: 'exam_id' })
  exam: Exam;

  @CreateDateColumn()
  started_at: Date;

  @Column({ nullable: true })
  submitted_at: Date;

  @Column({ type: 'decimal', nullable: true })
  score: number;

  @Column({ type: 'jsonb', nullable: true })
  variable_snapshot: Record<string, any>;

  @Column({ default: 0 })
  left_screen_count: number;

  @OneToMany(() => StudentAnswer, (a) => a.attempt, { cascade: true })
  answers: StudentAnswer[];
}
