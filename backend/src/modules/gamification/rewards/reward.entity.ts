import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';

export enum RewardType {
  DISCOUNT = 'discount',
  BADGE = 'badge',
  AVATAR_ITEM = 'avatar_item',
  TOPIC_UNLOCK = 'topic_unlock',
}

@Entity('rewards')
export class Reward {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ type: 'enum', enum: RewardType })
  type: RewardType;

  @Column({ type: 'jsonb' })
  value: Record<string, any>;

  @CreateDateColumn()
  earned_at: Date;

  @Column({ nullable: true })
  used_at: Date;
}
