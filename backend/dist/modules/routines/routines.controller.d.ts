import { RoutinesService } from './routines.service';
import { ProgressService } from '../progress/progress.service';
import { MicroLessonTrigger } from './micro-lesson.entity';
export declare class RoutinesController {
    private routinesService;
    private progressService;
    constructor(routinesService: RoutinesService, progressService: ProgressService);
    getCurrent(req: any): Promise<import("./routine.entity").LearningRoutine | null>;
    generate(req: any): Promise<import("./routine.entity").LearningRoutine>;
    getMicroLesson(topicId: string, trigger: MicroLessonTrigger): Promise<import("./micro-lesson.entity").MicroLesson | null>;
}
