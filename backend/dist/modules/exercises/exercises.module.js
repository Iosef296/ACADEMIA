"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExercisesModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const exercises_service_1 = require("./exercises.service");
const exercises_controller_1 = require("./exercises.controller");
const exercise_entity_1 = require("./entities/exercise.entity");
const exercise_step_entity_1 = require("./entities/exercise-step.entity");
const exercise_variable_entity_1 = require("./entities/exercise-variable.entity");
const parametric_service_1 = require("./parametric/parametric.service");
let ExercisesModule = class ExercisesModule {
};
exports.ExercisesModule = ExercisesModule;
exports.ExercisesModule = ExercisesModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([exercise_entity_1.Exercise, exercise_step_entity_1.ExerciseStep, exercise_variable_entity_1.ExerciseVariable])],
        providers: [exercises_service_1.ExercisesService, parametric_service_1.ParametricService],
        controllers: [exercises_controller_1.ExercisesController],
        exports: [exercises_service_1.ExercisesService],
    })
], ExercisesModule);
//# sourceMappingURL=exercises.module.js.map