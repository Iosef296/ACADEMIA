import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import databaseConfig from './config/database.config';
import valkeyConfig from './config/valkey.config';
import jwtConfig from './config/jwt.config';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { TopicsModule } from './modules/topics/topics.module';
import { ExercisesModule } from './modules/exercises/exercises.module';
import { GraphsModule } from './modules/graphs/graphs.module';
import { PdfModule } from './modules/pdf/pdf.module';
import { ExamsModule } from './modules/exams/exams.module';
import { ForumModule } from './modules/forum/forum.module';
import { LiveModule } from './modules/live/live.module';
import { ProgressModule } from './modules/progress/progress.module';
import { GamificationModule } from './modules/gamification/gamification.module';
import { MoodModule } from './modules/mood/mood.module';
import { RoutinesModule } from './modules/routines/routines.module';
import { OcrModule } from './modules/ocr/ocr.module';
import { NotificationsModule } from './modules/notifications/notifications.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, valkeyConfig, jwtConfig],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => config.get('database') as any,
    }),
    AuthModule,
    UsersModule,
    TopicsModule,
    ExercisesModule,
    GraphsModule,
    PdfModule,
    ExamsModule,
    ForumModule,
    LiveModule,
    ProgressModule,
    GamificationModule,
    MoodModule,
    RoutinesModule,
    OcrModule,
    NotificationsModule,
  ],
})
export class AppModule {}
