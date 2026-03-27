import { Topic } from '../topics/entities/topic.entity';
export declare enum MicroLessonTrigger {
    NO_IDEA = "no_idea",
    HIGH_ERRORS = "high_errors",
    NEW_TOPIC = "new_topic"
}
export declare class MicroLesson {
    id: string;
    topic: Topic;
    title: string;
    content_latex: string;
    trigger: MicroLessonTrigger;
}
