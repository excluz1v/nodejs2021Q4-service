import { FastifyInstance } from "fastify";
import User from "../resources/users/user.model";
import { loginBodyType } from "src/ts/types";

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
  fastify.post<loginBodyType>('/login', loginUserOpts, async (req, res) => {
    try {
      const { login, password } = req.body;
      const result = await User.login(login, password)
      if (!result) res.status(403).send('Forbidden')
      return result
    } catch (error) {
      res.send(error);
    }
  });
}
