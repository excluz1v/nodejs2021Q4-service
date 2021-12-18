"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv = require("dotenv");
const path = require("path");
dotenv.config({
    path: path.join(__dirname, '../../.env'),
});
exports.config = {
    PORT: process.env.PORT || '4000',
    NODE_ENV: process.env.NODE_ENV || 'development',
    MONGO_CONNECTION_STRING: process.env.MONGO_CONNECTION_STRING || 'your-mongo-db-connection-string',
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY || 'secret-key',
    AUTH_MODE: process.env.AUTH_MODE === 'true' || false,
};
//# sourceMappingURL=config.js.map