"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExamsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const exam_entity_1 = require("./entities/exam.entity");
const exam_attempt_entity_1 = require("./entities/exam-attempt.entity");
const student_answer_entity_1 = require("./entities/student-answer.entity");
const exam_question_entity_1 = require("./entities/exam-question.entity");
const adaptive_service_1 = require("./adaptive/adaptive.service");
const parametric_service_1 = require("../exercises/parametric/parametric.service");
let ExamsService = class ExamsService {
    examsRepo;
    attemptsRepo;
    answersRepo;
    questionsRepo;
    adaptiveService;
    parametricService;
    constructor(examsRepo, attemptsRepo, answersRepo, questionsRepo, adaptiveService, parametricService) {
        this.examsRepo = examsRepo;
        this.attemptsRepo = attemptsRepo;
        this.answersRepo = answersRepo;
        this.questionsRepo = questionsRepo;
        this.adaptiveService = adaptiveService;
        this.parametricService = parametricService;
    }
    async findAll(topicId) {
        const query = this.examsRepo.createQueryBuilder('exam')
            .leftJoinAndSelect('exam.topic', 'topic')
            .leftJoinAndSelect('exam.created_by', 'user');
        if (topicId)
            query.andWhere('topic.id = :topicId', { topicId });
        return query.getMany();
    }
    async findOne(id) {
        const exam = await this.examsRepo.findOne({
            where: { id },
            relations: ['topic', 'questions', 'questions.exercise', 'questions.exercise.variables'],
        });
        if (!exam)
            throw new common_1.NotFoundException('Examen no encontrado');
        return exam;
    }
    async create(data, user) {
        const exam = this.examsRepo.create({ ...data, created_by: user, topic: { id: data.topicId } });
        return this.examsRepo.save(exam);
    }
    async update(id, data) {
        const exam = await this.findOne(id);
        Object.assign(exam, data);
        return this.examsRepo.save(exam);
    }
    async remove(id) {
        const exam = await this.findOne(id);
        await this.examsRepo.remove(exam);
    }
    async startAttempt(examId, user) {
        const exam = await this.findOne(examId);
        const snapshot = {};
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
    async getAttempt(attemptId) {
        const attempt = await this.attemptsRepo.findOne({
            where: { id: attemptId },
            relations: ['exam', 'exam.questions', 'answers'],
        });
        if (!attempt)
            throw new common_1.NotFoundException('Intento no encontrado');
        return attempt;
    }
    async submitAnswer(attemptId, data) {
        const attempt = await this.getAttempt(attemptId);
        if (attempt.submitted_at)
            throw new common_1.ForbiddenException('El examen ya fue enviado');
        const question = await this.questionsRepo.findOne({
            where: { id: data.questionId },
            relations: ['exercise'],
        });
        if (!question)
            throw new common_1.NotFoundException('Pregunta no encontrada');
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
    async pingAttempt(attemptId, leftScreen) {
        if (leftScreen) {
            await this.attemptsRepo.increment({ id: attemptId }, 'left_screen_count', 1);
        }
    }
    async submitAttempt(attemptId) {
        const attempt = await this.getAttempt(attemptId);
        if (attempt.submitted_at)
            throw new common_1.BadRequestException('El examen ya fue enviado');
        const score = this.adaptiveService.calculateScore(attempt.exam.questions, attempt.answers);
        attempt.submitted_at = new Date();
        attempt.score = score;
        return this.attemptsRepo.save(attempt);
    }
    async getResult(attemptId) {
        return this.getAttempt(attemptId);
    }
};
exports.ExamsService = ExamsService;
exports.ExamsService = ExamsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(exam_entity_1.Exam)),
    __param(1, (0, typeorm_1.InjectRepository)(exam_attempt_entity_1.ExamAttempt)),
    __param(2, (0, typeorm_1.InjectRepository)(student_answer_entity_1.StudentAnswer)),
    __param(3, (0, typeorm_1.InjectRepository)(exam_question_entity_1.ExamQuestion)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        adaptive_service_1.AdaptiveService,
        parametric_service_1.ParametricService])
], ExamsService);
//# sourceMappingURL=exams.service.js.map