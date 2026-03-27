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
exports.ExercisesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const exercise_entity_1 = require("./entities/exercise.entity");
const exercise_step_entity_1 = require("./entities/exercise-step.entity");
const exercise_variable_entity_1 = require("./entities/exercise-variable.entity");
const parametric_service_1 = require("./parametric/parametric.service");
const user_entity_1 = require("../users/entities/user.entity");
let ExercisesService = class ExercisesService {
    exercisesRepo;
    stepsRepo;
    variablesRepo;
    parametricService;
    constructor(exercisesRepo, stepsRepo, variablesRepo, parametricService) {
        this.exercisesRepo = exercisesRepo;
        this.stepsRepo = stepsRepo;
        this.variablesRepo = variablesRepo;
        this.parametricService = parametricService;
    }
    async findAll(filters) {
        const query = this.exercisesRepo.createQueryBuilder('exercise')
            .leftJoinAndSelect('exercise.topic', 'topic')
            .leftJoinAndSelect('exercise.created_by', 'user');
        if (filters.topicId)
            query.andWhere('topic.id = :topicId', { topicId: filters.topicId });
        if (filters.difficulty)
            query.andWhere('exercise.difficulty = :difficulty', { difficulty: filters.difficulty });
        return query.getMany();
    }
    async findOne(id) {
        const exercise = await this.exercisesRepo.findOne({
            where: { id },
            relations: ['topic', 'created_by', 'steps', 'variables'],
        });
        if (!exercise)
            throw new common_1.NotFoundException('Ejercicio no encontrado');
        return exercise;
    }
    async generate(id) {
        const exercise = await this.findOne(id);
        if (!exercise.is_parametric) {
            return { exercise, values: {}, content_latex: exercise.content_latex };
        }
        const values = this.parametricService.generate(exercise.variables);
        const content_latex = this.parametricService.applyToLatex(exercise.content_latex, values);
        return { exercise, values, content_latex };
    }
    async create(data, user) {
        const exercise = this.exercisesRepo.create({
            title: data.title,
            content_latex: data.content_latex,
            topic: { id: data.topicId },
            created_by: user,
            difficulty: data.difficulty ?? exercise_entity_1.Difficulty.BASIC,
            is_parametric: data.is_parametric ?? false,
            needs_graph: data.needs_graph ?? false,
            graph_type: data.graph_type,
        });
        return this.exercisesRepo.save(exercise);
    }
    async update(id, data, user) {
        const exercise = await this.findOne(id);
        if (user.role !== user_entity_1.UserRole.ADMIN && exercise.created_by.id !== user.id) {
            throw new common_1.ForbiddenException('No puedes editar este ejercicio');
        }
        Object.assign(exercise, data);
        return this.exercisesRepo.save(exercise);
    }
    async remove(id, user) {
        const exercise = await this.findOne(id);
        if (user.role !== user_entity_1.UserRole.ADMIN && exercise.created_by.id !== user.id) {
            throw new common_1.ForbiddenException('No puedes eliminar este ejercicio');
        }
        await this.exercisesRepo.remove(exercise);
    }
    async getSteps(exerciseId) {
        return this.stepsRepo.find({
            where: { exercise: { id: exerciseId } },
            order: { order: 'ASC' },
        });
    }
    async addStep(exerciseId, data) {
        const step = this.stepsRepo.create({ ...data, exercise: { id: exerciseId } });
        return this.stepsRepo.save(step);
    }
    async updateStep(stepId, data) {
        const step = await this.stepsRepo.findOne({ where: { id: stepId } });
        if (!step)
            throw new common_1.NotFoundException('Paso no encontrado');
        Object.assign(step, data);
        return this.stepsRepo.save(step);
    }
    async removeStep(stepId) {
        const step = await this.stepsRepo.findOne({ where: { id: stepId } });
        if (!step)
            throw new common_1.NotFoundException('Paso no encontrado');
        await this.stepsRepo.remove(step);
    }
    async reorderSteps(exerciseId, order) {
        for (const item of order) {
            await this.stepsRepo.update(item.id, { order: item.order });
        }
    }
};
exports.ExercisesService = ExercisesService;
exports.ExercisesService = ExercisesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(exercise_entity_1.Exercise)),
    __param(1, (0, typeorm_1.InjectRepository)(exercise_step_entity_1.ExerciseStep)),
    __param(2, (0, typeorm_1.InjectRepository)(exercise_variable_entity_1.ExerciseVariable)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        parametric_service_1.ParametricService])
], ExercisesService);
//# sourceMappingURL=exercises.service.js.map