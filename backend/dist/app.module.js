"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const database_config_1 = __importDefault(require("./config/database.config"));
const valkey_config_1 = __importDefault(require("./config/valkey.config"));
const jwt_config_1 = __importDefault(require("./config/jwt.config"));
const auth_module_1 = require("./modules/auth/auth.module");
const users_module_1 = require("./modules/users/users.module");
const topics_module_1 = require("./modules/topics/topics.module");
const exercises_module_1 = require("./modules/exercises/exercises.module");
const graphs_module_1 = require("./modules/graphs/graphs.module");
const pdf_module_1 = require("./modules/pdf/pdf.module");
const exams_module_1 = require("./modules/exams/exams.module");
const forum_module_1 = require("./modules/forum/forum.module");
const live_module_1 = require("./modules/live/live.module");
const progress_module_1 = require("./modules/progress/progress.module");
const gamification_module_1 = require("./modules/gamification/gamification.module");
const mood_module_1 = require("./modules/mood/mood.module");
const routines_module_1 = require("./modules/routines/routines.module");
const ocr_module_1 = require("./modules/ocr/ocr.module");
const notifications_module_1 = require("./modules/notifications/notifications.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                load: [database_config_1.default, valkey_config_1.default, jwt_config_1.default],
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                inject: [config_1.ConfigService],
                useFactory: (config) => config.get('database'),
            }),
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            topics_module_1.TopicsModule,
            exercises_module_1.ExercisesModule,
            graphs_module_1.GraphsModule,
            pdf_module_1.PdfModule,
            exams_module_1.ExamsModule,
            forum_module_1.ForumModule,
            live_module_1.LiveModule,
            progress_module_1.ProgressModule,
            gamification_module_1.GamificationModule,
            mood_module_1.MoodModule,
            routines_module_1.RoutinesModule,
            ocr_module_1.OcrModule,
            notifications_module_1.NotificationsModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map