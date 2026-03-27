import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Exercise, Difficulty, GraphType } from './entities/exercise.entity';
import { ExerciseStep } from './entities/exercise-step.entity';
import { ExerciseVariable } from './entities/exercise-variable.entity';
import { ParametricService } from './parametric/parametric.service';
import { User, UserRole } from '../users/entities/user.entity';

@Injectable()
export class ExercisesService {
  constructor(
    @InjectRepository(Exercise)
    private exercisesRepo: Repository<Exercise>,
    @InjectRepository(ExerciseStep)
    private stepsRepo: Repository<ExerciseStep>,
    @InjectRepository(ExerciseVariable)
    private variablesRepo: Repository<ExerciseVariable>,
    private parametricService: ParametricService,
  ) {}

  async findAll(filters: { topicId?: string; difficulty?: Difficulty }): Promise<Exercise[]> {
    const query = this.exercisesRepo.createQueryBuilder('exercise')
      .leftJoinAndSelect('exercise.topic', 'topic')
      .leftJoinAndSelect('exercise.created_by', 'user');

    if (filters.topicId) query.andWhere('topic.id = :topicId', { topicId: filters.topicId });
    if (filters.difficulty) query.andWhere('exercise.difficulty = :difficulty', { difficulty: filters.difficulty });

    return query.getMany();
  }

  async findOne(id: string): Promise<Exercise> {
    const exercise = await this.exercisesRepo.findOne({
      where: { id },
      relations: ['topic', 'created_by', 'steps', 'variables'],
    });
    if (!exercise) throw new NotFoundException('Ejercicio no encontrado');
    return exercise;
  }

  async generate(id: string): Promise<{ exercise: Exercise; values: Record<string, number>; content_latex: string }> {
    const exercise = await this.findOne(id);

    if (!exercise.is_parametric) {
      return { exercise, values: {}, content_latex: exercise.content_latex };
    }

    const values = this.parametricService.generate(exercise.variables);
    const content_latex = this.parametricService.applyToLatex(exercise.content_latex, values);

    return { exercise, values, content_latex };
  }

  async create(data: {
    title: string;
    content_latex: string;
    topicId: string;
    difficulty?: Difficulty;
    is_parametric?: boolean;
    needs_graph?: boolean;
    graph_type?: GraphType;
  }, user: User): Promise<Exercise> {
    const exercise = this.exercisesRepo.create({
      title: data.title,
      content_latex: data.content_latex,
      topic: { id: data.topicId },
      created_by: user,
      difficulty: data.difficulty ?? Difficulty.BASIC,
      is_parametric: data.is_parametric ?? false,
      needs_graph: data.needs_graph ?? false,
      graph_type: data.graph_type,
    });

    return this.exercisesRepo.save(exercise);
  }

  async update(id: string, data: Partial<Exercise>, user: User): Promise<Exercise> {
    const exercise = await this.findOne(id);

    if (user.role !== UserRole.ADMIN && exercise.created_by.id !== user.id) {
      throw new ForbiddenException('No puedes editar este ejercicio');
    }

    Object.assign(exercise, data);
    return this.exercisesRepo.save(exercise);
  }

  async remove(id: string, user: User): Promise<void> {
    const exercise = await this.findOne(id);

    if (user.role !== UserRole.ADMIN && exercise.created_by.id !== user.id) {
      throw new ForbiddenException('No puedes eliminar este ejercicio');
    }

    await this.exercisesRepo.remove(exercise);
  }

  // Steps
  async getSteps(exerciseId: string): Promise<ExerciseStep[]> {
    return this.stepsRepo.find({
      where: { exercise: { id: exerciseId } },
      order: { order: 'ASC' },
    });
  }

  async addStep(exerciseId: string, data: { content_latex: string; hint?: string; warning?: string; order: number }): Promise<ExerciseStep> {
    const step = this.stepsRepo.create({ ...data, exercise: { id: exerciseId } });
    return this.stepsRepo.save(step);
  }

  async updateStep(stepId: string, data: Partial<ExerciseStep>): Promise<ExerciseStep> {
    const step = await this.stepsRepo.findOne({ where: { id: stepId } });
    if (!step) throw new NotFoundException('Paso no encontrado');
    Object.assign(step, data);
    return this.stepsRepo.save(step);
  }

  async removeStep(stepId: string): Promise<void> {
    const step = await this.stepsRepo.findOne({ where: { id: stepId } });
    if (!step) throw new NotFoundException('Paso no encontrado');
    await this.stepsRepo.remove(step);
  }

  async reorderSteps(exerciseId: string, order: { id: string; order: number }[]): Promise<void> {
    for (const item of order) {
      await this.stepsRepo.update(item.id, { order: item.order });
    }
  }
}
