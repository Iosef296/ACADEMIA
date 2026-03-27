"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("@nestjs/config");
exports.default = (0, config_1.registerAs)('valkey', () => ({
    host: process.env.VALKEY_HOST,
    port: parseInt(process.env.VALKEY_PORT ?? '6379', 10),
}));
//# sourceMappingURL=valkey.config.js.map