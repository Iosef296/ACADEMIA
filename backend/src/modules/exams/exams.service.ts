import { Injectable, NotFoundException, ForbiddenException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Exam } from './entities/exam.entity';
import { ExamAttempt } from './entities/exam-attempt.entity';
import { StudentAnswer, DifficultyRating } from './entities/student-answer.entity';
import { ExamQuestion } from './entities/exam-question.entity';
import { AdaptiveService } from './adaptive/adaptive.service';
import { ParametricService } from '../exercises/parametric/parametric.service';
import { User } from '../users/entities/user.entity';

@Injectable()
export class ExamsService {
  constructor(
    @InjectRepository(Exam) private examsRepo: Repository<Exam>,
    @InjectRepository(ExamAttempt) private attemptsRepo: Repository<ExamAttempt>,
    @InjectRepository(StudentAnswer) private answersRepo: Repository<StudentAnswer>,
    @InjectRepository(ExamQuestion) private questionsRepo: Repository<ExamQuestion>,
    private adaptiveService: AdaptiveService,
    private parametricService: ParametricService,
  ) {}

  async findAll(topicId?: string): Promise<Exam[]> {
    const query = this.examsRepo.createQueryBuilder('exam')
      .leftJoinAndSelect('exam.topic', 'topic')
      .leftJoinAndSelect('exam.created_by', 'user');
    if (topicId) query.andWhere('topic.id = :topicId', { topicId });
    return query.getMany();
  }

  async findOne(id: string): Promise<Exam> {
    const exam = await this.examsRepo.findOne({
      where: { id },
      relations: ['topic', 'questions', 'questions.exercise', 'questions.exercise.variables'],
    });
    if (!exam) throw new NotFoundException('Examen no encontrado');
    return exam;
  }

  async create(data: any, user: User): Promise<Exam> {
    const exam = this.examsRepo.create({ ...data, created_by: user, topic: { id: data.topicId } });
    return this.examsRepo.save(exam) as unknown as Promise<Exam>;
  }

  async update(id: string, data: any): Promise<Exam> {
    const exam = await this.findOne(id);
    Object.assign(exam, data);
    return this.examsRepo.save(exam);
  }

  async remove(id: string): Promise<void> {
    const exam = await this.findOne(id);
    await this.examsRepo.remove(exam);
  }

  async startAttempt(examId: string, user: User): Promise<ExamAttempt> {
    const exam = await this.findOne(examId);

    // Generar variaciones paramétricas para cada pregunta
    const snapshot: Record<string, any> = {};
    for (const question of exam.questions) {
      if (question.exercise.is_parametric && question.exercise.variables?.length) {
        snapshot[question.id] = this.parametricService.generate(question.exercise.variables);
      }
    }

    const attempt = this.attemptsRepo.create({
      user,
      exam,
      variable_snapshot: snapshot,
    });

    return this.attemptsRepo.save(attempt);
  }

  async getAttempt(attemptId: string): Promise<ExamAttempt> {
    const attempt = await this.attemptsRepo.findOne({
      where: { id: attemptId },
      relations: ['exam', 'exam.questions', 'answers'],
    });
    if (!attempt) throw new NotFoundException('Intento no encontrado');
    return attempt;
  }

  async submitAnswer(attemptId: string, data: {
    questionId: string;
    content_latex: string;
    hints_used?: number;
    difficulty_rating?: DifficultyRating;
    time_spent?: number;
  }): Promise<{ answer: StudentAnswer; triggerMicroLesson: boolean }> {
    const attempt = await this.getAttempt(attemptId);
    if (attempt.submitted_at) throw new ForbiddenException('El examen ya fue enviado');

    const question = await this.questionsRepo.findOne({
      where: { id: data.questionId },
      relations: ['exercise'],
    });
    if (!question) throw new NotFoundException('Pregunta no encontrada');

    const answer = this.answersRepo.create({
      attempt,
      question,
      content_latex: data.content_latex,
      hints_used: data.hints_used ?? 0,
      difficulty_rating: data.difficulty_rating,
      time_spent: data.time_spent ?? 0,
    });

    const saved = await this.answersRepo.save(answer);
    const triggerMicroLesson = data.difficulty_rating
      ? this.adaptiveService.shouldTriggerMicroLesson(data.difficulty_rating)
      : false;

    return { answer: saved, triggerMicroLesson };
  }

  async pingAttempt(attemptId: string, leftScreen: boolean): Promise<void> {
    if (leftScreen) {
      await this.attemptsRepo.increment({ id: attemptId }, 'left_screen_count', 1);
    }
  }

  async submitAttempt(attemptId: string): Promise<ExamAttempt> {
    const attempt = await this.getAttempt(attemptId);
    if (attempt.submitted_at) throw new BadRequestException('El examen ya fue enviado');

    const score = this.adaptiveService.calculateScore(attempt.exam.questions, attempt.answers);
    attempt.submitted_at = new Date();
    attempt.score = score;

    return this.attemptsRepo.save(attempt);
  }

  async getResult(attemptId: string): Promise<ExamAttempt> {
    return this.getAttempt(attemptId);
  }
}
