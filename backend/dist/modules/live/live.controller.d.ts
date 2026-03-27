import { LiveService } from './live.service';
export declare class LiveController {
    private liveService;
    constructor(liveService: LiveService);
    findActive(): Promise<import("./live.entity").LiveSession[]>;
    findOne(id: string): Promise<import("./live.entity").LiveSession>;
    create(body: {
        title: string;
        topicId: string;
    }, req: any): Promise<import("./live.entity").LiveSession>;
    end(id: string): Promise<import("./live.entity").LiveSession>;
}
