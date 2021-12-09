import fastify = require('fastify');
import swagger = require('fastify-swagger');
import path = require('path');

import userRoutes = require('./resources/users/user.router');

// const fastifyPlugin = require('./resources/login/auth');
// const { AuthRouter } = require('./resources/login/auth.route');
import {config}  from './common/config';

import boardRoutes = require('./resources/boards/boards.router');

import taskRoutes = require('./resources/tasks/task.router');

const server=fastify()

server.register(swagger, {
  mode: 'static',
  routePrefix: '/doc',
  specification: {
    path: path.resolve(__dirname, '../doc/api.yaml'),
    postProcessor(swaggerObject) {
      return swaggerObject;
    },
  },
  exposeRoute: true,
});

// if (AUTH_MODE) {
//   server.register(fastifyPlugin);
//   server.register(AuthRouter);
// }

server.register(userRoutes);
server.register(boardRoutes);
server.register(taskRoutes);

const start = async () => {
  try {
    await server.listen(config.PORT);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
