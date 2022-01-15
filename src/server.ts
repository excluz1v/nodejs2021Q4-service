import fastify, { FastifyInstance } from 'fastify';
import swagger from 'fastify-swagger';
import path from 'path';
import fs from 'fs';
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { userRoutes } from './resources/users/user.router';
// const fastifyPlugin from './resources/login/auth');
// const { AuthRouter } from './resources/login/auth.route');
import { config } from './common/config';
import { boardRoutes } from './resources/boards/boards.router';
import { taskRoutes } from './resources/tasks/task.router';
import { logger } from './logger';

import { User } from './entity/User';

const server: FastifyInstance = fastify({ logger });

createConnection()
  .then(async (connection) => {
    console.log('Inserting a new user into the database...');
    const user = new User();
    user.firstName = 'Timber';
    user.lastName = 'Saw';
    user.age = 25;
    await connection.manager.save(user);
    console.log(`Saved a new user with id:%${user.id} `);

    console.log('Loading users from the database...');
    const users = await connection.manager.find(User);
    console.log('Loaded users: ', users);

    console.log('Here you can setup and run express/koa/any other framework.');
  })
  .catch((error) => console.log(error));
// if (AUTH_MODE) {
//   server.register(fastifyPlugin);
//   server.register(AuthRouter);
// }
const errorPath = path.resolve(__dirname, '../errors.log');
const start = async () => {
  try {
    console.log('errorMessage');

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
