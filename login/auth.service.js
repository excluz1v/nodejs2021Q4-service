const authRepo = require('./auth.memory.repository');

const checkPassword = async (login, password) => {
  const result = await authRepo.checkPassword(login, password);
  return result;
};

module.exports = { checkPassword };
