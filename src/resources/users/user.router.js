const { AUTH_MODE } = require('../../common/config');
const User = require('./user.model');
const usersService = require('./user.service');
const schemas = require('./users.schema');

function addAuthValidation(schema, preValidation) {
  if (AUTH_MODE) {
    const validatedSchema = { ...schema };
    validatedSchema.preValidation = preValidation;
    return validatedSchema;
  }
  return schema;
}

async function userRoutes(fastify, options, done) {
  const getUserOpts = addAuthValidation(schemas.getUserOpts, [fastify.auth]);
  const getUserByIdOpts = addAuthValidation(schemas.getUserByIdOpts, [
    fastify.auth,
  ]);
  const putUserOpts = addAuthValidation(schemas.putUserOpts, [fastify.auth]);
  const deleteUserOpts = addAuthValidation({}, [fastify.auth]);

  fastify.get('/users', getUserOpts, async (req, res) => {
    const users = await usersService.getAll();
    res.send(users.map(User.toResponse));
  });

  fastify.get('/users/:userId', getUserByIdOpts, async (req, res) => {
    const { userId } = req.params;
    const result = await usersService.getUserById(userId);
    if (result === false) res.status(400).send('User not found');
    res.send(result);
  });

  fastify.post('/users', schemas.postUserOpts, async (req, res) => {
    const { body } = req;

    const userInfo = await usersService.postUser(body);
    res.status(201).send(userInfo);
  });

  fastify.put('/users/:userId', putUserOpts, async (req, res) => {
    const { body } = req;
    const { userId } = req.params;
    const userInfo = await usersService.putUser(userId, body);
    if (userInfo === false) res.status(400).send('User not found');
    res.send(userInfo);
  });

  fastify.delete('/users/:userId', deleteUserOpts, async (req, res) => {
    const { userId } = req.params;
    const result = await usersService.deleteUserById(userId);
    if (result === false) res.status(404).send('User not found');
    res.status(204).send();
  });

  done();
}

module.exports = userRoutes;
