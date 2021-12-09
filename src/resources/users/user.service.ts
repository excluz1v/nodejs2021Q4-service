import { userType } from "src/ts/types";
import { usersRepo } from "./user.memory.repository";
import { User } from "./user.model";


const getAll =  () =>{
const users= usersRepo.getAll()
const result=users.map(el=> User.toResponse(el))
return result
};

const postUser =  (userCredentials:userType) => {
  const newUser =  usersRepo.postUser(userCredentials);
  return User.toResponse(newUser);
};

const getUserById =  (id:string) => {
  const result =  usersRepo.getUserById(id);
  if (result === undefined) return false;
  return User.toResponse(result);
};

const putUser =  (id:string, userCredentials:userType) => {
  const updatedUser =  usersRepo.updateUserById(id, userCredentials);
  if (updatedUser === false) return false;
  return User.toResponse(updatedUser);
};

const deleteUserById =  (id:string) => {
  const result =  usersRepo.deleteUserById(id);
  return result;
};

export const usersService = { getAll, postUser, getUserById, putUser, deleteUserById };
