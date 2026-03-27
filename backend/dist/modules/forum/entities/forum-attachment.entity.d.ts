import { ForumPost } from './forum-post.entity';
export declare enum AttachmentType {
    IMAGE = "image",
    PDF = "pdf",
    LATEX = "latex"
}
export declare class ForumAttachment {
    id: string;
    post: ForumPost;
    file_url: string;
    type: AttachmentType;
}
