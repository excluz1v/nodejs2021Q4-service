import { userType } from 'src/ts/types';
import User from './user.model';
import { tasksRepo } from '../tasks/tasks.memory.repository';

let users: [] | User[] = [];
/**
 * receive all users from database
 * @returns array of users instances or empty array
 */
const getAll = () => users;

/**
 * create new user
 * @param user new user data Object
 * @returns created User instance with public properties
 */
const postUser = (user: userType) => true;
/**
 * receive single user by id
 * @param id user id string
 * @returns boolean if user exist or not
 */
const getUserById = (id: string) => {
  const result = users.find((user: User) => user.id === id);
  return result;
};
/**
 * receive single user by login
 * @param login user login string
 * @returns boolean if user exist or not
 */
const getUserByLogin = (login: string) => {
  const result = users.find((user: User) => user?.login === login);
  return result;
};

/**
 * update certain user in database
 * @param id user id string
 * @param userCredentials new user data object
 * @returns updated user info object
 */
const updateUserById = (id: string, userCredentials: userType) => true;

/**
 * delete user from database by id
 * @param id user id string
 * @returns boolean if user deleted from database
 */
const deleteUserById = (id: string) => {
  const isExist = getUserById(id);
  if (isExist === undefined) return false;
  users = users.filter((user: User) => user.id !== id);
  tasksRepo.deleteAssignedUsers(id);
  return true;
};

export const usersRepo = {
  getAll,
  postUser,
  getUserById,
  updateUserById,
  deleteUserById,
  getUserByLogin,
};
