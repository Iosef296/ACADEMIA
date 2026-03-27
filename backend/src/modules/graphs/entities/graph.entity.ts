import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { Exercise } from '../../exercises/entities/exercise.entity';

export enum GraphRenderType {
  FUNCTION = 'function',
  TEMPLATE = 'template',
  MANUAL = 'manual',
}

@Entity('graphs')
export class Graph {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => Exercise)
  @JoinColumn({ name: 'exercise_id' })
  exercise: Exercise;

  @Column({ type: 'enum', enum: GraphRenderType })
  type: GraphRenderType;

  @Column({ type: 'jsonb' })
  config: Record<string, any>;

  @Column({ default: false })
  is_parametric: boolean;
}
