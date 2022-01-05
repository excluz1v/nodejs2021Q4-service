import fastify, { FastifyInstance } from 'fastify';
import swagger from 'fastify-swagger';
import path from 'path';
import fs from 'fs';
import { userRoutes } from './resources/users/user.router';
// const fastifyPlugin from './resources/login/auth');
// const { AuthRouter } from './resources/login/auth.route');
import { config } from './common/config';
import { boardRoutes } from './resources/boards/boards.router';
import { taskRoutes } from './resources/tasks/task.router';
import { logger } from './logger';

const server: FastifyInstance = fastify({ logger });

// if (AUTH_MODE) {
//   server.register(fastifyPlugin);
//   server.register(AuthRouter);
// }

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
    await server.register(userRoutes);
    await server.register(boardRoutes);
    await server.register(taskRoutes);
    await server.listen(config.PORT);
    process.on('uncaughtException', (e) => {
      const getDateTime = (): string => new Date().toLocaleString();
      const errorStream = fs.createWriteStream(errorPath, 'utf-8');
      const errorMessage = `uncaughtException ERROR: ${getDateTime()} ${
        e.message
      }\n`;
      errorStream.write(errorMessage, () => {
        console.log(errorMessage);
      });
    });

    process.on('unhandledRejection', (e: Error) => {
      const getDateTime = (): string => new Date().toLocaleString();
      const errorStream = fs.createWriteStream(errorPath, 'utf-8');
      const errorMessage = `unhandledRejection ERROR: ${getDateTime()} ${
        e.message
      }\n`;
      errorStream.write(errorMessage, () => {
        console.log(errorMessage);
      });
    });

    // TEST ERROR
    // await Promise.reject(Error('Oops!'))

    // TEST ERROR
    // throw new Error('Oops!');
  } catch (err) {
    server.log.error(err);
  }
};
void start();
