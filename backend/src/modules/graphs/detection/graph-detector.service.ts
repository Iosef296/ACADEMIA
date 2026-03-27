import { Injectable } from '@nestjs/common';

export enum DetectedGraphType {
  FUNCTION = 'function',
  GEOMETRIC = 'geometric',
  STATISTICAL = 'statistical',
  VENN = 'venn',
  DIAGRAM = 'diagram',
  NONE = 'none',
}

export interface DetectionResult {
  detected: boolean;
  type: DetectedGraphType;
  suggestion: string;
  extractedFunction?: string;
}

@Injectable()
export class GraphDetectorService {
  private readonly rules: Array<{
    patterns: RegExp[];
    type: DetectedGraphType;
    suggestion: string;
  }> = [
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

  detect(text: string, latex: string): DetectionResult {
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

  private extractFunction(text: string): string | undefined {
    // Extrae f(x) = ... o y = ...
    const match = text.match(/(?:f\s*\(x\)\s*=|y\s*=)\s*([^\n,;]+)/i);
    return match ? match[1].trim() : undefined;
  }
}
