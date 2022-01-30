import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.join(__dirname, '../../.env'),
});
export const config = {
  PORT: process.env.PORT || '4000',
  NODE_ENV: process.env.NODE_ENV || 'development',
  MONGO_CONNECTION_STRING:
    process.env.MONGO_CONNECTION_STRING || 'your-mongo-db-connection-string',
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY || 'secret-key',
  AUTH_MODE: process.env.AUTH_MODE === 'true' || true,
  LOGGING_LEVEL: process.env.LOGGING_LEVEL || '3',
  POSTGRES_USER: process.env.POSTGRES_USER || 'testDB',
  POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD || 'testDB',
  POSTGRES_DB: process.env.POSTGRES_DB || 'testDB',
  POSTGRES_PORT: +process.env.POSTGRES_PORT! || 5432,
};
