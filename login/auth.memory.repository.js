const usersRepo = require('../users/user.memory.repository');

async function checkPassword(login, password) {
  const user = await usersRepo.getUserByLogin(login);
  if (!user) return false;
  if (user.password === password) return true;
  return false;
}

module.exports = { checkPassword };
