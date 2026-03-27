import { ForumService } from './forum.service';
import { AttachmentType } from './entities/forum-attachment.entity';
export declare class ForumController {
    private forumService;
    constructor(forumService: ForumService);
    findAll(topicId?: string, exerciseId?: string): Promise<import("./entities/forum-post.entity").ForumPost[]>;
    findOne(id: string): Promise<import("./entities/forum-post.entity").ForumPost>;
    create(body: {
        content: string;
        topicId: string;
        exerciseId?: string;
    }, req: any): Promise<import("./entities/forum-post.entity").ForumPost>;
    reply(id: string, content: string, req: any): Promise<import("./entities/forum-post.entity").ForumPost>;
    update(id: string, content: string, req: any): Promise<import("./entities/forum-post.entity").ForumPost>;
    remove(id: string, req: any): Promise<void>;
    addAttachment(id: string, body: {
        file_url: string;
        type: AttachmentType;
    }): Promise<import("./entities/forum-attachment.entity").ForumAttachment>;
}
