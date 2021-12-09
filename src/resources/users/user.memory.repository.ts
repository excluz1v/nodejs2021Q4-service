import { userType } from "src/ts/types";
import { User } from "./user.model";

import taskRepo = require('../tasks/tasks.memory.repository');

let users:[]|User[] = [];

const getAll =  () => users;

const postUser =  (user:userType) => {
  const newUser = new User(user);
  users = [...users, newUser];
  return newUser;
};

const getUserById =  (id:string) => {
  const result =  users.find((user:User) => user.id === id);
  return result;
};
const getUserByLogin =  (login:string) => {
  const result =  users.find((user:User) => user?.login === login);
  return result;
};

const updateUserById =  (id:string, userCredentials:userType):User|false => {
  const result =  users.find((user:User) => user.id === id);
  if (result === undefined) return false;

  let userIndex:number;
  users = users.map((user, index) => {
    if (user.id === id) {
      userIndex = index;
      return { ...user, ...userCredentials };
    }
    return user;
  });
  return users[userIndex];
};

const deleteUserById =  (id:string) => {
  const isExist =  getUserById(id);
  if (isExist === undefined) return false;
  users =  users.filter((user:User) => user.id !== id);
  taskRepo.deleteAssignedUsers(id);
  return true;
};

export const usersRepo= {
  getAll,
  postUser,
  getUserById,
  updateUserById,
  deleteUserById,
  getUserByLogin,
};
