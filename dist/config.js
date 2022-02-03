"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
exports.config = {
    PORT: process.env.PORT,
    NODE_ENV: process.env.NODE_ENV || 'development',
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY || 'secret-key',
    AUTH_MODE: process.env.AUTH_MODE === 'true' || true,
    POSTGRES_USER: process.env.POSTGRES_USER || 'testDB',
    POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD || 'testDB',
    POSTGRES_DB: process.env.POSTGRES_DB || 'testDB',
    POSTGRES_PORT: +process.env.POSTGRES_PORT || 5432,
};
console.log(exports.config.PORT);
//# sourceMappingURL=config.js.map