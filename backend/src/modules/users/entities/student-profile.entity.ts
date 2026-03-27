import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity('student_profiles')
export class StudentProfile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => User, (user) => user.profile)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ default: 0 })
  xp_total: number;

  @Column({ default: 0 })
  streak_current: number;

  @Column({ default: 0 })
  streak_max: number;

  @Column({ type: 'date', nullable: true })
  streak_last_active: Date;

  @Column({ default: true })
  ranking_visible: boolean;

  @Column({ type: 'jsonb', nullable: true })
  avatar_config: Record<string, any>;
}
