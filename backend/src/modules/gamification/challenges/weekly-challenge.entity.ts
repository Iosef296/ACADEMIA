import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Topic } from '../../topics/entities/topic.entity';
import { WeeklyChallengeAttempt } from './weekly-challenge-attempt.entity';

@Entity('weekly_challenges')
export class WeeklyChallenge {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Topic)
  @JoinColumn({ name: 'topic_id' })
  topic: Topic;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'jsonb' })
  exercise_ids: string[];

  @Column({ type: 'date' })
  start_date: Date;

  @Column({ type: 'date' })
  end_date: Date;

  @Column({ default: 50 })
  reward_xp: number;

  @OneToMany(() => WeeklyChallengeAttempt, (a) => a.challenge)
  attempts: WeeklyChallengeAttempt[];
}
