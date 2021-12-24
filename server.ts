import fastify, { FastifyInstance} from 'fastify';
import swagger from 'fastify-swagger';
import path from 'path';
import {userRoutes} from './resources/users/user.router';
// const fastifyPlugin from './resources/login/auth');
// const { AuthRouter } from './resources/login/auth.route');
import {config}  from './common/config';
import {boardRoutes} from './resources/boards/boards.router';
import {taskRoutes} from './resources/tasks/task.router';




const server:FastifyInstance=fastify({logger:true})

// if (AUTH_MODE) {
//   server.register(fastifyPlugin);
//   server.register(AuthRouter);
// }



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
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};


void start()