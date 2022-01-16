import { FastifyReply, FastifyRequest } from 'fastify';
import { userType } from 'src/ts/types';
import { usersRepo } from './user.memory.repository';
import User from './user.model';

/**
 * receive all users from database
 * @returns array of users instances or empty array
 */
const getAll = async (req: FastifyRequest, res: FastifyReply) => {
  try {
    const users = await User.find();
    res.send(users).log.debug(`Users received from the base`);
  } catch (error) {
    console.log(error);
  }
};

/**
 * create new user
 * @param userCredentials new user data Object
 * @returns created User instance with public properties
 */
const postUser = (userCredentials: userType) => true;

/**
 * receive single user by id
 * @param id user id string
 * @returns false if user not exist or user object with public properties
 */

const getUserById = (id: string) => true;

/**
 * update certain user in database
 * @param id user id string
 * @param userCredentials ew user data object
 * @returns updated user info object with publick properties
 */

const putUser = (id: string, userCredentials: userType) => true;

/**
 * delete user from database by id
 * @param id  user id string
 * @returns boolean if user deleted from database
 */

const deleteUserById = (id: string) => true;

export const usersService = {
  getAll,
  postUser,
  getUserById,
  putUser,
  deleteUserById,
};
