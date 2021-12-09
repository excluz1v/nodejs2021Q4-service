import { FastifyInstance, FastifyPluginOptions, FastifyReply } from "fastify";
import { requestUserParams } from "src/ts/interfaces";
import { userSchema } from "./users.schema";
import {usersService} from './user.service';

// function addAuthValidation(schema, preValidation) {
//   if (AUTH_MODE) {
//     const validatedSchema = { ...schema };
//     validatedSchema.preValidation = preValidation;
//     return validatedSchema;
//   }
//   return schema;
// }

export  function userRoutes(fastify:FastifyInstance, options:FastifyPluginOptions, done:()=>void) {

  // AUTHENTICATE
  // const getUserOpts = addAuthValidation(userSchema.getUserOpts, [fastify.auth]);
  // const getUserByIdOpts = addAuthValidation(userSchema.getUserByIdOpts, [
  //   fastify.auth,
  // ]);
  // const putUserOpts = addAuthValidation(userSchema.putUserOpts, [fastify.auth]);
  // const deleteUserOpts = addAuthValidation({}, [fastify.auth]);

  fastify.get('/users', userSchema.getUserOpts, async (req, res:FastifyReply) => {
    const users =  usersService.getAll();
    try {
     await res.send(users);
    } catch (error) {
      await  res.send(404)
    }
    
  });

  fastify.get<requestUserParams>('/users/:userId', userSchema.getUserByIdOpts, async (req, res) => {
    const { userId } = req.params;
    const result =  usersService.getUserById(userId);
    if (result === false)await res.status(400).send('User not found');
    try {
    await  res.send(result);
    } catch (error) {
      await res.send(404)
    }

   
  });

  fastify.post<requestUserParams>('/users', userSchema.postUserOpts,  async (req, res) => {
    const { body } = req;
    const userInfo =  usersService.postUser(body);
   await res.status(201).send(userInfo);
  });

  fastify.put<requestUserParams>('/users/:userId', userSchema.putUserOpts,  async(req, res) => {
    const { body } = req;
    const { userId } = req.params;
    const userInfo =  usersService.putUser(userId, body);
    if (userInfo === false)await res.status(400).send('User not found');
    try {
    await  res.send(userInfo);
    } catch (error) {
      await res.send(404)
    }
   
  });

  fastify.delete<requestUserParams>('/users/:userId', async (req, res) => {
    const { userId } = req.params;
    const result =  usersService.deleteUserById(userId);
    if (result === false)await res.status(404).send('User not found');
    try {
    await  res.status(204).send();
    } catch (error) {
      await res.send(404)
    }
    
  });

  done();
}
