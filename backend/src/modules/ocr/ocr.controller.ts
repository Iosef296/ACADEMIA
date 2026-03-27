import { Controller, Post, UseGuards, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { OcrService } from './ocr.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@Controller('ocr')
@UseGuards(JwtAuthGuard)
export class OcrController {
  constructor(private ocrService: OcrService) {}

  @Post('extract')
  @UseInterceptors(FileInterceptor('image'))
  extract(@UploadedFile() file: Express.Multer.File) {
    return this.ocrService.extract(file.buffer, file.mimetype);
  }
}
