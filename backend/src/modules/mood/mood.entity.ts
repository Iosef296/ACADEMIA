import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, Unique } from 'typeorm';
import { User } from '../users/entities/user.entity';

export enum MoodType {
  HAPPY = 'happy',
  NEUTRAL = 'neutral',
  SAD = 'sad',
  STRESSED = 'stressed',
  MOTIVATED = 'motivated',
}

@Entity('mood_checkins')
@Unique(['user', 'date'])
export class MoodCheckin {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ type: 'enum', enum: MoodType })
  mood: MoodType;

  @Column({ type: 'date' })
  date: string;
}
