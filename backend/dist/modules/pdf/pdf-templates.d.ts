export interface PdfSection {
    title?: string;
    content_latex?: string;
    exercises?: Array<{
        title: string;
        content_latex: string;
        steps?: Array<{
            content_latex: string;
        }>;
        include_solution: boolean;
    }>;
}
export interface PdfTemplateConfig {
    institution?: string;
    logo_url?: string;
    primary_color?: string;
    watermark?: string;
    show_page_numbers?: boolean;
    space_for_answer?: boolean;
}
export declare function buildHtml(title: string, sections: PdfSection[], config: PdfTemplateConfig): string;
