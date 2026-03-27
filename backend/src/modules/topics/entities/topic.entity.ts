import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';

@Entity('topics')
export class Topic {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => Topic, (topic) => topic.children, { nullable: true })
  @JoinColumn({ name: 'parent_id' })
  parent: Topic;

  @OneToMany(() => Topic, (topic) => topic.parent)
  children: Topic[];

  @Column({ default: 0 })
  order: number;

  @Column({ default: false })
  is_locked: boolean;

  @Column({ type: 'jsonb', nullable: true })
  unlock_condition: Record<string, any>;
}
