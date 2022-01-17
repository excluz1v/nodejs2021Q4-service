const jwt = require('fastify-jwt');
const fp = require('fastify-plugin');
const { JWT_SECRET_KEY } = require('../../common/config');

module.exports = fp(async (fastify) => {
  fastify.register(jwt, {
    secret: JWT_SECRET_KEY,
  });

  fastify.decorate('auth', async (request, reply) => {
    try {
      await request.jwtVerify();
    } catch (err) {
      reply.send(err);
    }
  });
});
