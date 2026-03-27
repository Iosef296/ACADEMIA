export declare class OcrService {
    extract(imageBuffer: Buffer, mimetype: string): Promise<{
        text: string;
        confidence: number;
    }>;
}
