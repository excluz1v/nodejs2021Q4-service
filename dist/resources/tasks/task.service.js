"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskService = void 0;
const tasks_memory_repository_1 = require("./tasks.memory.repository");
const getAll = (boardId) => {
    const res = tasks_memory_repository_1.tasksRepo.getAllTasksByBoardId(boardId);
    return res;
};
const postTask = (boardId, newTaskData) => {
    const newTask = tasks_memory_repository_1.tasksRepo.postTasks(boardId, newTaskData);
    return newTask;
};
const getTaskById = (boardId, taskId) => {
    const result = tasks_memory_repository_1.tasksRepo.getTaskByBoardIdAndId(boardId, taskId);
    return result;
};
const updateTask = (boardId, taskId, newTaskInfo) => {
    const updatedTask = tasks_memory_repository_1.tasksRepo.updateTask(taskId, newTaskInfo);
    return updatedTask;
};
const deleteTaskById = (boardId, taskId) => {
    const result = tasks_memory_repository_1.tasksRepo.deleteTaskById(boardId, taskId);
    return result;
};
exports.taskService = {
    getAll,
    postTask,
    getTaskById,
    updateTask,
    deleteTaskById,
};
//# sourceMappingURL=task.service.js.map