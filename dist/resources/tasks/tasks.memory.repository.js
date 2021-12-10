"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tasksRepo = void 0;
const task_model_1 = require("./task.model");
let tasks = [];
const getAllTasksByBoardId = (boardId) => {
    const res = tasks.filter((task) => task.boardId === boardId);
    return res;
};
const getTaskByBoardIdAndId = (boardId, taskId) => {
    const res = tasks.filter((task) => task.boardId === boardId && task.id === taskId);
    if (res.length === 0)
        return false;
    return res[0];
};
const postTasks = (boardId, taskData) => {
    const newTask = new task_model_1.Task({ ...taskData, boardId });
    tasks = [...tasks, newTask];
    return newTask;
};
const updateTask = (taskId, newTaskInfo) => {
    let taskIndex = 0;
    tasks = tasks.map((task, index) => {
        if (task.id === taskId) {
            taskIndex = index;
            return { ...task, ...newTaskInfo };
        }
        return task;
    });
    return tasks[taskIndex];
};
const deleteTaskById = (boardId, taskId) => {
    const res = getAllTasksByBoardId(boardId);
    if (res)
        tasks = tasks.filter((task) => task.id !== taskId);
    return res;
};
const deleteAssignedUsers = (userId) => {
    tasks = tasks.map((task) => {
        if (task.userId === userId) {
            const nullUser = { "userId": null };
            const updatedTask = { ...task, ...nullUser };
            return updatedTask;
        }
        return task;
    });
};
const deleteTaskByBoardId = (boardId) => {
    tasks = tasks.filter((task) => task.boardId !== boardId);
};
exports.tasksRepo = {
    getAllTasksByBoardId,
    getTaskByBoardIdAndId,
    postTasks,
    updateTask,
    deleteTaskById,
    deleteAssignedUsers,
    tasks,
    deleteTaskByBoardId,
};
//# sourceMappingURL=tasks.memory.repository.js.map