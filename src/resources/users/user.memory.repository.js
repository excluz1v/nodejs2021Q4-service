const User = require('./user.model');
const taskRepo = require('../tasks/tasks.memory.repository');

let users = [];

const getAll = async () => users;

const postUser = async (user) => {
  const newUser = new User(user);
  users = [...users, newUser];
  return newUser;
};

const getUserById = async (id) => {
  const result = await users.find((user) => user.id === id);
  return result;
};
const getUserByLogin = async (login) => {
  const result = await users.find((user) => user.login === login);
  return result;
};

const updateUserById = async (id, userCredentials) => {
  const result = await users.find((user) => user.id === id);
  if (result === undefined) return false;

  let userIndex;
  users = users.map((user, index) => {
    if (user.id === id) {
      userIndex = index;
      return { ...user, ...userCredentials };
    }
    return user;
  });
  return users[userIndex];
};

const deleteUserById = async (id) => {
  const isExist = await getUserById(id);
  if (isExist === undefined) return false;
  users = await users.filter((user) => user.id !== id);
  taskRepo.deleteAssignedUsers(id);
  return true;
};

module.exports = {
  getAll,
  postUser,
  getUserById,
  updateUserById,
  deleteUserById,
  getUserByLogin,
};
