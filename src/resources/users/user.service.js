const usersRepo = require('./user.memory.repository');
const User = require('./user.model');

const getAll = async () => usersRepo.getAll();

const postUser = async (userCredentials) => {
  const newUser = await usersRepo.postUser(userCredentials);
  return User.toResponse(newUser);
};

const getUserById = async (id) => {
  const result = await usersRepo.getUserById(id);
  if (result === undefined) return false;
  return User.toResponse(result);
};

const putUser = async (id, userCredentials) => {
  const updatedUser = await usersRepo.updateUserById(id, userCredentials);
  if (updatedUser === false) return false;
  return User.toResponse(updatedUser);
};

const deleteUserById = async (id) => {
  const result = await usersRepo.deleteUserById(id);
  return result;
};

module.exports = { getAll, postUser, getUserById, putUser, deleteUserById };
