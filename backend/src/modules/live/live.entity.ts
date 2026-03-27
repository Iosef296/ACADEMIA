import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { Topic } from '../topics/entities/topic.entity';

@Entity('live_sessions')
export class LiveSession {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'host_id' })
  host: User;

  @ManyToOne(() => Topic)
  @JoinColumn({ name: 'topic_id' })
  topic: Topic;

  @Column()
  title: string;

  @Column()
  room_url: string;

  @CreateDateColumn()
  started_at: Date;

  @Column({ nullable: true })
  ended_at: Date;

  @Column({ default: true })
  is_active: boolean;
}
