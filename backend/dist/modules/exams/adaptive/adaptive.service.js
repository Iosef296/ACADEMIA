"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdaptiveService = void 0;
const common_1 = require("@nestjs/common");
const student_answer_entity_1 = require("../entities/student-answer.entity");
const exercise_entity_1 = require("../../exercises/entities/exercise.entity");
let AdaptiveService = class AdaptiveService {
    getNextDifficulty(answers) {
        if (answers.length === 0)
            return exercise_entity_1.Difficulty.BASIC;
        const last3 = answers.slice(-3);
        const correctCount = last3.filter((a) => a.is_correct).length;
        const hasNoIdea = last3.some((a) => a.difficulty_rating === student_answer_entity_1.DifficultyRating.NO_IDEA);
        if (hasNoIdea || correctCount === 0)
            return exercise_entity_1.Difficulty.BASIC;
        if (correctCount === 3)
            return exercise_entity_1.Difficulty.ADVANCED;
        return exercise_entity_1.Difficulty.INTERMEDIATE;
    }
    calculateScore(questions, answers) {
        if (questions.length === 0)
            return 0;
        const correct = answers.filter((a) => a.is_correct).length;
        const base = (correct / questions.length) * 20;
        const hintPenalty = answers.reduce((sum, a) => sum + a.hints_used * 0.1, 0);
        return Math.max(0, parseFloat((base - hintPenalty).toFixed(2)));
    }
    shouldTriggerMicroLesson(rating) {
        return rating === student_answer_entity_1.DifficultyRating.NO_IDEA;
    }
};
exports.AdaptiveService = AdaptiveService;
exports.AdaptiveService = AdaptiveService = __decorate([
    (0, common_1.Injectable)()
], AdaptiveService);
//# sourceMappingURL=adaptive.service.js.map