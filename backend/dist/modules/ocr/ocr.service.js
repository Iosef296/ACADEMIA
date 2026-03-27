"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OcrService = void 0;
const common_1 = require("@nestjs/common");
const tesseract_js_1 = require("tesseract.js");
let OcrService = class OcrService {
    async extract(imageBuffer, mimetype) {
        const allowed = ['image/jpeg', 'image/png', 'image/webp'];
        if (!allowed.includes(mimetype)) {
            throw new common_1.BadRequestException('Formato de imagen no soportado. Use JPG, PNG o WebP');
        }
        const worker = await (0, tesseract_js_1.createWorker)('spa+eng');
        try {
            const { data } = await worker.recognize(imageBuffer);
            return {
                text: data.text.trim(),
                confidence: Math.round(data.confidence),
            };
        }
        finally {
            await worker.terminate();
        }
    }
};
exports.OcrService = OcrService;
exports.OcrService = OcrService = __decorate([
    (0, common_1.Injectable)()
], OcrService);
//# sourceMappingURL=ocr.service.js.map