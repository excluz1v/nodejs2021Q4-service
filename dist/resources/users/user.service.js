"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersService = void 0;
const user_memory_repository_1 = require("./user.memory.repository");
const user_model_1 = require("./user.model");
const getAll = () => {
    const users = user_memory_repository_1.usersRepo.getAll();
    const result = users.map(el => user_model_1.User.toResponse(el));
    return result;
};
const postUser = (userCredentials) => {
    const newUser = user_memory_repository_1.usersRepo.postUser(userCredentials);
    return user_model_1.User.toResponse(newUser);
};
const getUserById = (id) => {
    const result = user_memory_repository_1.usersRepo.getUserById(id);
    if (result === undefined)
        return false;
    return user_model_1.User.toResponse(result);
};
const putUser = (id, userCredentials) => {
    const updatedUser = user_memory_repository_1.usersRepo.updateUserById(id, userCredentials);
    if (updatedUser === false)
        return false;
    return user_model_1.User.toResponse(updatedUser);
};
const deleteUserById = (id) => {
    const result = user_memory_repository_1.usersRepo.deleteUserById(id);
    return result;
};
exports.usersService = { getAll, postUser, getUserById, putUser, deleteUserById };
//# sourceMappingURL=user.service.js.map