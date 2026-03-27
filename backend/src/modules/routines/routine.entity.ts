import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { User } from '../users/entities/user.entity';

@Entity('learning_routines')
export class LearningRoutine {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @CreateDateColumn()
  generated_at: Date;

  @Column({ type: 'date' })
  valid_until: string;

  @Column({ type: 'jsonb' })
  content: Record<string, any>;
}
