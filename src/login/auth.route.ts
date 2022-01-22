import { FastifyInstance } from "fastify";

// Options for Login user
const loginUserOpts = {
  schema: {
    body: {
      type: 'object',
      required: ['login', 'password'],
      properties: {
        login: { type: 'string' },
        password: { type: 'string' },
      },
    },
    response: {
      200: {
        type: 'object',
        properties: {
          token: { type: 'string' },
        },
      },
    },
  },
};

export default async function AuthRouter(fastify: FastifyInstance) {
  fastify.post('/login', loginUserOpts, async (req, res) => {
    try {
      // const { login, password } = req.body;
      // const credentials = await checkPassword(login, password);
      // if (credentials) {
      // const token = fastify.jwt.sign(
      //   { login, password },
      //   { expiresIn: 86400 }
      // );
      // res.status(200).send(token);
      // }
      //  else res.status(403).send('Incorrect login or password');
    } catch (error) {
      res.send(error);
    }
  });
}
