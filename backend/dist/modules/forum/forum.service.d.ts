import { Repository } from 'typeorm';
import { ForumPost } from './entities/forum-post.entity';
import { ForumAttachment, AttachmentType } from './entities/forum-attachment.entity';
import { User } from '../users/entities/user.entity';
export declare class ForumService {
    private postsRepo;
    private attachmentsRepo;
    constructor(postsRepo: Repository<ForumPost>, attachmentsRepo: Repository<ForumAttachment>);
    findAll(filters: {
        topicId?: string;
        exerciseId?: string;
    }): Promise<ForumPost[]>;
    findOne(id: string): Promise<ForumPost>;
    create(data: {
        content: string;
        topicId: string;
        exerciseId?: string;
    }, user: User): Promise<ForumPost>;
    reply(parentId: string, content: string, user: User): Promise<ForumPost>;
    update(id: string, content: string, user: User): Promise<ForumPost>;
    remove(id: string, user: User): Promise<void>;
    addAttachment(postId: string, data: {
        file_url: string;
        type: AttachmentType;
    }): Promise<ForumAttachment>;
}
