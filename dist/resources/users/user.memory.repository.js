"use strict";
const user_model_1 = require("./user.model");
const taskRepo = require("../tasks/tasks.memory.repository");
let users = [];
const getAll = () => users;
const postUser = (user) => {
    const newUser = new user_model_1.User(user);
    users = [...users, newUser];
    return newUser;
};
const getUserById = (id) => {
    const result = users.find((user) => user.id === id);
    return result;
};
const getUserByLogin = (login) => {
    const result = users.find((user) => user?.login === login);
    return result;
};
const updateUserById = (id, userCredentials) => {
    const result = users.find((user) => user.id === id);
    if (result === undefined)
        return false;
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
const deleteUserById = (id) => {
    const isExist = getUserById(id);
    if (isExist === undefined)
        return false;
    users = users.filter((user) => user.id !== id);
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
//# sourceMappingURL=user.memory.repository.js.map