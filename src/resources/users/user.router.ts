import { FastifyInstance, FastifyPluginOptions, FastifyReply } from 'fastify';
import { GetUserReq, PostUserReq, PutUserReq } from 'src/ts/interfaces';
import bcrypt from 'bcrypt'
import { userSchema } from './users.schema';
import User from './user.model';


export function userRoutes(
  fastify: FastifyInstance,
  options: FastifyPluginOptions,
  done: () => void
) {

  fastify.get(
    '/users',
    userSchema.getUserOpts,
    async (req, res: FastifyReply) => {
      const users = await User.find();
      await res.send(users);
      try {
        await res.send(users);
      } catch (error) {
        await res.send(404);
      }
    }
  );

  fastify.get<GetUserReq>(
    '/users/:userId',
    userSchema.getUserByIdOpts,
    async (req, res) => {
      try {
        const { userId } = req.params;
        const user = await User.findOne(userId);
        if (user) {
          await res.send(user);
        } else {
          await res.status(404).send(`User id:${userId} is not found`);
        }
      } catch (error) {
        console.log(error);
      }
    }
  );

  fastify.post<PostUserReq>(
    '/users',
    userSchema.postUserOpts,
    async (req, res) => {
      try {
        let { password } = req.body;
        const { name, login, } = req.body
        password = bcrypt.hashSync(password, 10)
        const newUser = new User(name, login, password);
        await User.save(newUser);
        await res.status(201).send(newUser);
      } catch (error) {
        console.log(error);
      }
    }
  );

  fastify.put<PutUserReq>(
    '/users/:userId',
    userSchema.putUserOpts,
    async (req, res) => {
      try {
        const { name, login, password } = req.body;
        const { userId } = req.params;
        const user = await User.findOne(userId);
        if (user) {
          user.name = name || user.name;
          user.login = login || user.login;
          user.password = password || user.password;
          await User.save(user);
          await res.send(user);
        }
      } catch (error) {
        await res.send(404);
      }
    }
  );

  fastify.delete<GetUserReq>('/users/:userId', async (req, res) => {
    try {
      const { userId } = req.params;
      const user = await User.findOne(userId);
      if (user) {
        await User.remove(user);
        await res.status(204).send();
      } else await res.status(404).send('User not found');
    } catch (error) {
      console.log(error);
    }
  });

  done();
}
