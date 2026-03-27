import { Injectable, BadRequestException } from '@nestjs/common';
import { createWorker } from 'tesseract.js';

@Injectable()
export class OcrService {
  async extract(imageBuffer: Buffer, mimetype: string): Promise<{ text: string; confidence: number }> {
    const allowed = ['image/jpeg', 'image/png', 'image/webp'];
    if (!allowed.includes(mimetype)) {
      throw new BadRequestException('Formato de imagen no soportado. Use JPG, PNG o WebP');
    }

    const worker = await createWorker('spa+eng');

    try {
      const { data } = await worker.recognize(imageBuffer);
      return {
        text: data.text.trim(),
        confidence: Math.round(data.confidence),
      };
    } finally {
      await worker.terminate();
    }
  }
}
