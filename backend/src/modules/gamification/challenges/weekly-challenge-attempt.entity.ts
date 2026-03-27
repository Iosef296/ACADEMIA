import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column, CreateDateColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { WeeklyChallenge } from './weekly-challenge.entity';

@Entity('weekly_challenge_attempts')
export class WeeklyChallengeAttempt {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => WeeklyChallenge, (c) => c.attempts)
  @JoinColumn({ name: 'challenge_id' })
  challenge: WeeklyChallenge;

  @CreateDateColumn()
  completed_at: Date;

  @Column({ type: 'decimal', nullable: true })
  score: number;
}
