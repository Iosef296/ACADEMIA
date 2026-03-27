import { PdfSection, PdfTemplateConfig } from './pdf-templates';
export declare class PdfService {
    generate(data: {
        title: string;
        sections: PdfSection[];
        config: PdfTemplateConfig;
    }): Promise<Buffer>;
    preview(data: {
        title: string;
        sections: PdfSection[];
        config: PdfTemplateConfig;
    }): string;
}
