import { Repository } from 'typeorm';
import { LearningRoutine } from './routine.entity';
import { MicroLesson, MicroLessonTrigger } from './micro-lesson.entity';
import { StudentProgress } from '../progress/entities/student-progress.entity';
export declare class RoutinesService {
    private routinesRepo;
    private microRepo;
    constructor(routinesRepo: Repository<LearningRoutine>, microRepo: Repository<MicroLesson>);
    getCurrent(userId: string): Promise<LearningRoutine | null>;
    generate(userId: string, progress: StudentProgress[]): Promise<LearningRoutine>;
    getMicroLesson(topicId: string, trigger: MicroLessonTrigger): Promise<MicroLesson | null>;
}
