import { Injectable } from '@nestjs/common';
import { ExerciseVariable, VariableType } from '../entities/exercise-variable.entity';

@Injectable()
export class ParametricService {
  generate(variables: ExerciseVariable[], maxAttempts = 100): Record<string, number> {
    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      const values: Record<string, number> = {};

      for (const variable of variables) {
        values[variable.name] = this.generateValue(variable);
      }

      if (this.checkConditions(variables, values)) {
        return values;
      }
    }

    throw new Error('No se pudo generar valores que cumplan las condiciones tras ' + maxAttempts + ' intentos');
  }

  private generateValue(variable: ExerciseVariable): number {
    if (variable.type === VariableType.LIST) {
      const list = variable.allowed_values;
      return list[Math.floor(Math.random() * list.length)];
    }

    const min = Number(variable.min);
    const max = Number(variable.max);

    if (variable.type === VariableType.INTEGER) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    return parseFloat((Math.random() * (max - min) + min).toFixed(2));
  }

  private checkConditions(variables: ExerciseVariable[], values: Record<string, number>): boolean {
    for (const variable of variables) {
      if (!variable.conditions) continue;

      const conditions = variable.conditions as Record<string, string>;

      for (const [, expression] of Object.entries(conditions)) {
        try {
          const result = this.evaluateExpression(expression, values);
          if (!result) return false;
        } catch {
          return false;
        }
      }
    }
    return true;
  }

  private evaluateExpression(expression: string, values: Record<string, number>): boolean {
    let expr = expression;
    for (const [name, value] of Object.entries(values)) {
      expr = expr.replace(new RegExp(name, 'g'), String(value));
    }
    // Evaluación segura de expresión matemática booleana
    return Function('"use strict"; return (' + expr + ')')();
  }

  applyToLatex(latex: string, values: Record<string, number>): string {
    let result = latex;
    for (const [name, value] of Object.entries(values)) {
      result = result.replace(new RegExp(`\\{${name}\\}`, 'g'), String(value));
    }
    return result;
  }
}
