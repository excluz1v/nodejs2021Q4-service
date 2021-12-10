import { userType } from "src/ts/types";
import { usersRepo } from "./user.memory.repository";
import { User } from "./user.model";

/**
 * 
 * @returns array of users instances or empty array
 */
const getAll =  () =>{
const users= usersRepo.getAll()
const result=users.map(el=> User.toResponse(el))
return result
};

/**
 * 
 * @param userCredentials new user data Object
 * @returns created User instance with public properties
 */
const postUser =  (userCredentials:userType) => {
  const newUser =  usersRepo.postUser(userCredentials);
  return User.toResponse(newUser);
};
/**
 * 
 * @param id user id string
 * @returns false if user not exist or user object with public properties
 */
const getUserById =  (id:string) => {
  const result =  usersRepo.getUserById(id);
  if (result === undefined) return false;
  return User.toResponse(result);
};
/**
 * 
 * @param id user id string
 * @param userCredentials ew user data object
 * @returns updated user info object with publick properties
 */

const putUser =  (id:string, userCredentials:userType) => {
  const updatedUser =  usersRepo.updateUserById(id, userCredentials);
  if (updatedUser === false) return false;
  return User.toResponse(updatedUser);
};
/**
 * 
 * @param id  user id string
 * @returns boolean if user deleted from database
 */
const deleteUserById =  (id:string) => {
  const result =  usersRepo.deleteUserById(id);
  return result;
};

export const usersService = { getAll, postUser, getUserById, putUser, deleteUserById };
