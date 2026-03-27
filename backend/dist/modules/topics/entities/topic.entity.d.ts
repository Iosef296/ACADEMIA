export declare class Topic {
    id: string;
    name: string;
    parent: Topic;
    children: Topic[];
    order: number;
    is_locked: boolean;
    unlock_condition: Record<string, any>;
}
