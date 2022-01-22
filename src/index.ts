import fastify, { FastifyInstance } from 'fastify';
import swagger from 'fastify-swagger';
import path from 'path';
import fs from 'fs';
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { userRoutes } from './resources/users/user.router';
import { authPlugin } from './login/auth';
import { config } from './common/config';
import { boardRoutes } from './resources/boards/boards.router';
import { taskRoutes } from './resources/tasks/task.router';
import User from './resources/users/user.model';
import Board from './resources/boards/board.model';
import Columns from './resources/column/Column.model';
import Task from './resources/tasks/task.model';
import AuthRouter from './login/auth.route';

const server: FastifyInstance = fastify({ logger: false });

async function main() {
  try {
    await createConnection({
      type: 'postgres',
      host: 'postgres',
      port: config.POSTGRES_PORT,
      username: config.POSTGRES_USER,
      password: config.POSTGRES_PASSWORD,
      database: config.POSTGRES_DB,
      entities: [User, Board, Columns, Task],
      logging: false,
      synchronize: false,
      migrations: ['src/migration/*.ts'],
      migrationsRun: true,
    })
      .then((connection) => {
        console.log(
          'Here you can setup and run express/koa/any other framework.'
        );
      })
      .catch((error) => console.log(error));
  } catch (err) {
    console.log(err);
  }
}



const errorPath = path.resolve(__dirname, '../errors.log');
const start = async () => {
  try {
    await server.register(swagger, {
      mode: 'static',
      routePrefix: '/doc',
      specification: {
        path: path.resolve(__dirname, '../doc/api.yaml'),
        postProcessor(swaggerObject) {
          return swaggerObject;
        },
        baseDir: __dirname,
      },
      exposeRoute: true,
    });
    // if (config.AUTH_MODE) {
    //   await server.register(authPlugin);
    //   await server.register(AuthRouter);
    // }
    await server.register(userRoutes);
    await server.register(boardRoutes);
    await server.register(taskRoutes);
    await server.listen(config.PORT, '0.0.0.0');
    process.on('uncaughtException', (e) => {
      const getDateTime = (): string => new Date().toLocaleString();
      const errorStream = fs.createWriteStream(errorPath, 'utf-8');
      const errorMessage = `uncaughtException ERROR: ${getDateTime()} ${e.message
        }\n`;
      errorStream.write(errorMessage, () => {
        console.log(errorMessage);
      });
    });

    process.on('unhandledRejection', (e: Error) => {
      const getDateTime = (): string => new Date().toLocaleString();
      const errorStream = fs.createWriteStream(errorPath, 'utf-8');
      const errorMessage = `unhandledRejection ERROR: ${getDateTime()} ${e.message
        }\n`;
      errorStream.write(errorMessage, () => {
        console.log(errorMessage);
      });
    });
    await main();
  } catch (err) {
    server.log.error(err);
  }
};
start().catch((err) => console.log(err));
