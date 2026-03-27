"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PdfController = void 0;
const common_1 = require("@nestjs/common");
const pdf_service_1 = require("./pdf.service");
const jwt_auth_guard_1 = require("../../common/guards/jwt-auth.guard");
let PdfController = class PdfController {
    pdfService;
    constructor(pdfService) {
        this.pdfService = pdfService;
    }
    preview(body, res) {
        const html = this.pdfService.preview(body);
        res.setHeader('Content-Type', 'text/html');
        res.send(html);
    }
    async generate(body, res) {
        const pdf = await this.pdfService.generate(body);
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename="${body.title}.pdf"`);
        res.send(pdf);
    }
};
exports.PdfController = PdfController;
__decorate([
    (0, common_1.Post)('preview'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], PdfController.prototype, "preview", null);
__decorate([
    (0, common_1.Post)('generate'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PdfController.prototype, "generate", null);
exports.PdfController = PdfController = __decorate([
    (0, common_1.Controller)('pdf'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [pdf_service_1.PdfService])
], PdfController);
//# sourceMappingURL=pdf.controller.js.map