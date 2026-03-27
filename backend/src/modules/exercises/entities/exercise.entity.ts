import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { Topic } from '../../topics/entities/topic.entity';
import { User } from '../../users/entities/user.entity';
import { ExerciseStep } from './exercise-step.entity';
import { ExerciseVariable } from './exercise-variable.entity';

export enum Difficulty {
  BASIC = 'basic',
  INTERMEDIATE = 'intermediate',
  ADVANCED = 'advanced',
}

export enum GraphType {
  FUNCTION = 'function',
  GEOMETRIC = 'geometric',
  STATISTICAL = 'statistical',
  DIAGRAM = 'diagram',
}

@Entity('exercises')
export class Exercise {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Topic)
  @JoinColumn({ name: 'topic_id' })
  topic: Topic;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'created_by' })
  created_by: User;

  @Column()
  title: string;

  @Column({ type: 'text' })
  content_latex: string;

  @Column({ default: false })
  is_parametric: boolean;

  @Column({ type: 'enum', enum: Difficulty, default: Difficulty.BASIC })
  difficulty: Difficulty;

  @Column({ default: false })
  needs_graph: boolean;

  @Column({ type: 'enum', enum: GraphType, nullable: true })
  graph_type: GraphType;

  @OneToMany(() => ExerciseStep, (step) => step.exercise, { cascade: true })
  steps: ExerciseStep[];

  @OneToMany(() => ExerciseVariable, (variable) => variable.exercise, { cascade: true })
  variables: ExerciseVariable[];

  @CreateDateColumn()
  created_at: Date;
}
