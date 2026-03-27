import { User } from '../../users/entities/user.entity';
import { Topic } from '../../topics/entities/topic.entity';
import { Exercise } from '../../exercises/entities/exercise.entity';
import { ForumAttachment } from './forum-attachment.entity';
export declare class ForumPost {
    id: string;
    user: User;
    topic: Topic;
    exercise: Exercise;
    parent: ForumPost;
    replies: ForumPost[];
    attachments: ForumAttachment[];
    content: string;
    created_at: Date;
}
