import dotenv = require('dotenv');
import path = require('path');
import { configType } from 'src/ts/types';

dotenv.config({
  path: path.join(__dirname, '../../.env'),
});


const levelTranslate: {[key: string]:string} = {
  '0':'info',
  '1':'warn',
  '2':'error',
  '3':'fatal'
}

const level: string=process.env.LOGGING_LEVEL || '3'

export const config:configType = {
  PORT: process.env.PORT ||'4000',
  NODE_ENV: process.env.NODE_ENV ||'development',
  MONGO_CONNECTION_STRING: process.env.MONGO_CONNECTION_STRING ||'your-mongo-db-connection-string',
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY ||'secret-key',
  AUTH_MODE: process.env.AUTH_MODE === 'true' ||false,
  LOGGING_LEVEL: levelTranslate[level] 
};
