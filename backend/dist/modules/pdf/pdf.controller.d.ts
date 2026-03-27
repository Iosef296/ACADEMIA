import type { Response } from 'express';
import { PdfService } from './pdf.service';
import { PdfSection, PdfTemplateConfig } from './pdf-templates';
export declare class PdfController {
    private pdfService;
    constructor(pdfService: PdfService);
    preview(body: {
        title: string;
        sections: PdfSection[];
        config: PdfTemplateConfig;
    }, res: Response): void;
    generate(body: {
        title: string;
        sections: PdfSection[];
        config: PdfTemplateConfig;
    }, res: Response): Promise<void>;
}
