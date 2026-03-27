"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParametricService = void 0;
const common_1 = require("@nestjs/common");
const exercise_variable_entity_1 = require("../entities/exercise-variable.entity");
let ParametricService = class ParametricService {
    generate(variables, maxAttempts = 100) {
        for (let attempt = 0; attempt < maxAttempts; attempt++) {
            const values = {};
            for (const variable of variables) {
                values[variable.name] = this.generateValue(variable);
            }
            if (this.checkConditions(variables, values)) {
                return values;
            }
        }
        throw new Error('No se pudo generar valores que cumplan las condiciones tras ' + maxAttempts + ' intentos');
    }
    generateValue(variable) {
        if (variable.type === exercise_variable_entity_1.VariableType.LIST) {
            const list = variable.allowed_values;
            return list[Math.floor(Math.random() * list.length)];
        }
        const min = Number(variable.min);
        const max = Number(variable.max);
        if (variable.type === exercise_variable_entity_1.VariableType.INTEGER) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
        return parseFloat((Math.random() * (max - min) + min).toFixed(2));
    }
    checkConditions(variables, values) {
        for (const variable of variables) {
            if (!variable.conditions)
                continue;
            const conditions = variable.conditions;
            for (const [, expression] of Object.entries(conditions)) {
                try {
                    const result = this.evaluateExpression(expression, values);
                    if (!result)
                        return false;
                }
                catch {
                    return false;
                }
            }
        }
        return true;
    }
    evaluateExpression(expression, values) {
        let expr = expression;
        for (const [name, value] of Object.entries(values)) {
            expr = expr.replace(new RegExp(name, 'g'), String(value));
        }
        return Function('"use strict"; return (' + expr + ')')();
    }
    applyToLatex(latex, values) {
        let result = latex;
        for (const [name, value] of Object.entries(values)) {
            result = result.replace(new RegExp(`\\{${name}\\}`, 'g'), String(value));
        }
        return result;
    }
};
exports.ParametricService = ParametricService;
exports.ParametricService = ParametricService = __decorate([
    (0, common_1.Injectable)()
], ParametricService);
//# sourceMappingURL=parametric.service.js.map