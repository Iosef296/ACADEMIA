import { Injectable } from '@nestjs/common';
import puppeteer from 'puppeteer';
import { buildHtml, PdfSection, PdfTemplateConfig } from './pdf-templates';

@Injectable()
export class PdfService {
  async generate(data: {
    title: string;
    sections: PdfSection[];
    config: PdfTemplateConfig;
  }): Promise<Buffer> {
    const html = buildHtml(data.title, data.sections, data.config);

    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    try {
      const page = await browser.newPage();
      await page.setContent(html, { waitUntil: 'networkidle0' });

      const pdf = await page.pdf({
        format: 'A4',
        margin: { top: '1cm', bottom: '1cm', left: '1.5cm', right: '1.5cm' },
        printBackground: true,
      });

      return Buffer.from(pdf);
    } finally {
      await browser.close();
    }
  }

  preview(data: {
    title: string;
    sections: PdfSection[];
    config: PdfTemplateConfig;
  }): string {
    return buildHtml(data.title, data.sections, data.config);
  }
}
