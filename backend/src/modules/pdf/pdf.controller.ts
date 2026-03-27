import { Controller, Post, Body, Res, UseGuards } from '@nestjs/common';
import type { Response } from 'express';
import { PdfService } from './pdf.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { PdfSection, PdfTemplateConfig } from './pdf-templates';

@Controller('pdf')
@UseGuards(JwtAuthGuard)
export class PdfController {
  constructor(private pdfService: PdfService) {}

  @Post('preview')
  preview(
    @Body() body: { title: string; sections: PdfSection[]; config: PdfTemplateConfig },
    @Res() res: Response,
  ) {
    const html = this.pdfService.preview(body);
    res.setHeader('Content-Type', 'text/html');
    res.send(html);
  }

  @Post('generate')
  async generate(
    @Body() body: { title: string; sections: PdfSection[]; config: PdfTemplateConfig },
    @Res() res: Response,
  ) {
    const pdf = await this.pdfService.generate(body);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${body.title}.pdf"`);
    res.send(pdf);
  }
}
