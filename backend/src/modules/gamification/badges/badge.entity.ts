import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { UserBadge } from './user-badge.entity';

export enum BadgeConditionType {
  EXERCISES_COUNT = 'exercises_count',
  STREAK = 'streak',
  TOPIC_LEVEL = 'topic_level',
  TIME_SPENT = 'time_spent',
  CHALLENGE = 'challenge',
  NO_ERRORS = 'no_errors',
}

@Entity('badges')
export class Badge {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Column()
  icon: string;

  @Column({ type: 'enum', enum: BadgeConditionType })
  condition_type: BadgeConditionType;

  @Column({ type: 'jsonb' })
  condition_value: Record<string, any>;

  @OneToMany(() => UserBadge, (ub) => ub.badge)
  user_badges: UserBadge[];
}
