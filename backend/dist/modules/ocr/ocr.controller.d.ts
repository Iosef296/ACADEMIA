import { OcrService } from './ocr.service';
export declare class OcrController {
    private ocrService;
    constructor(ocrService: OcrService);
    extract(file: Express.Multer.File): Promise<{
        text: string;
        confidence: number;
    }>;
}
