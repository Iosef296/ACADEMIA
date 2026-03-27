export declare enum DetectedGraphType {
    FUNCTION = "function",
    GEOMETRIC = "geometric",
    STATISTICAL = "statistical",
    VENN = "venn",
    DIAGRAM = "diagram",
    NONE = "none"
}
export interface DetectionResult {
    detected: boolean;
    type: DetectedGraphType;
    suggestion: string;
    extractedFunction?: string;
}
export declare class GraphDetectorService {
    private readonly rules;
    detect(text: string, latex: string): DetectionResult;
    private extractFunction;
}
