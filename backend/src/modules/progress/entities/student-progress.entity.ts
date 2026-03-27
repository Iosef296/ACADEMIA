import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, Unique } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Topic } from '../../topics/entities/topic.entity';

@Entity('student_progress')
@Unique(['user', 'topic'])
export class StudentProgress {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Topic)
  @JoinColumn({ name: 'topic_id' })
  topic: Topic;

  @Column({ default: 0 })
  xp: number;

  @Column({ default: 1 })
  level: number;

  @Column({ default: 0 })
  exercises_solved: number;

  @Column({ default: 0 })
  error_count: number;

  @Column({ default: 0 })
  time_spent: number;
}
