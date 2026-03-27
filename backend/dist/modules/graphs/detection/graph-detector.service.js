"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GraphDetectorService = exports.DetectedGraphType = void 0;
const common_1 = require("@nestjs/common");
var DetectedGraphType;
(function (DetectedGraphType) {
    DetectedGraphType["FUNCTION"] = "function";
    DetectedGraphType["GEOMETRIC"] = "geometric";
    DetectedGraphType["STATISTICAL"] = "statistical";
    DetectedGraphType["VENN"] = "venn";
    DetectedGraphType["DIAGRAM"] = "diagram";
    DetectedGraphType["NONE"] = "none";
})(DetectedGraphType || (exports.DetectedGraphType = DetectedGraphType = {}));
let GraphDetectorService = class GraphDetectorService {
    rules = [
        {
            patterns: [/f\s*\(x\)\s*=/i, /y\s*=/i, /grafica[r]?\s+(?:la\s+)?función/i, /dominio|rango|intervalo/i],
            type: DetectedGraphType.FUNCTION,
            suggestion: 'Gráfico de función detectado. ¿Deseas graficarlo automáticamente?',
        },
        {
            patterns: [/grafica[r]?|traza[r]?|bosqueja[r]?|dibuja[r]?/i, /plano\s+cartesiano/i, /coordenadas?\s*\(/i],
            type: DetectedGraphType.GEOMETRIC,
            suggestion: 'Ejercicio con gráfico geométrico. ¿Deseas usar una plantilla?',
        },
        {
            patterns: [/área|perímetro|triángulo|rectángulo|círculo|cuadrado|polígono/i, /radio|diámetro|hipotenusa/i],
            type: DetectedGraphType.GEOMETRIC,
            suggestion: 'Figura geométrica detectada. ¿Deseas usar una plantilla?',
        },
        {
            patterns: [/sen\s*\(|sin\s*\(|cos\s*\(|tan\s*\(|cot\s*\(|sec\s*\(/i, /función\s+trigonométrica/i],
            type: DetectedGraphType.FUNCTION,
            suggestion: 'Función trigonométrica detectada. ¿Deseas graficarlo automáticamente?',
        },
        {
            patterns: [/conjunto|unión|intersección|∪|∩|diagrama\s+de\s+venn/i, /U\s*=/i],
            type: DetectedGraphType.VENN,
            suggestion: 'Diagrama de Venn detectado. ¿Deseas generarlo automáticamente?',
        },
        {
            patterns: [/tabla\s+de\s+(?:datos|frecuencia)|histograma|barras|dispersión|regresión/i],
            type: DetectedGraphType.STATISTICAL,
            suggestion: 'Gráfico estadístico detectado. ¿Deseas generarlo automáticamente?',
        },
        {
            patterns: [/plano\s+inclinado|polea|masa|bloque|cuerda|fricción/i, /circuito|resistencia|voltaje|corriente/i, /proyectil|lanza|velocidad\s+inicial/i],
            type: DetectedGraphType.DIAGRAM,
            suggestion: 'Diagrama físico detectado. ¿Deseas usar una plantilla base?',
        },
    ];
    detect(text, latex) {
        const combined = `${text} ${latex}`;
        for (const rule of this.rules) {
            const matched = rule.patterns.some((pattern) => pattern.test(combined));
            if (matched) {
                const extractedFunction = this.extractFunction(combined);
                return {
                    detected: true,
                    type: rule.type,
                    suggestion: rule.suggestion,
                    extractedFunction,
                };
            }
        }
        return { detected: false, type: DetectedGraphType.NONE, suggestion: '' };
    }
    extractFunction(text) {
        const match = text.match(/(?:f\s*\(x\)\s*=|y\s*=)\s*([^\n,;]+)/i);
        return match ? match[1].trim() : undefined;
    }
};
exports.GraphDetectorService = GraphDetectorService;
exports.GraphDetectorService = GraphDetectorService = __decorate([
    (0, common_1.Injectable)()
], GraphDetectorService);
//# sourceMappingURL=graph-detector.service.js.map