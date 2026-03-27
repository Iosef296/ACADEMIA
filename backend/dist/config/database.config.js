"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("@nestjs/config");
exports.default = (0, config_1.registerAs)('database', () => {
    const isProd = process.env.NODE_ENV === 'production';
    if (process.env.DATABASE_URL) {
        return {
            type: 'postgres',
            url: process.env.DATABASE_URL,
            entities: [__dirname + '/../**/*.entity{.ts,.js}'],
            synchronize: !isProd,
            ssl: { rejectUnauthorized: false },
            extra: { ssl: { rejectUnauthorized: false } },
            retryAttempts: 3,
            retryDelay: 2000,
        };
    }
    return {
        type: 'postgres',
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT ?? '5432', 10),
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: !isProd,
        logging: !isProd,
        ssl: isProd ? { rejectUnauthorized: false } : false,
    };
});
//# sourceMappingURL=database.config.js.map