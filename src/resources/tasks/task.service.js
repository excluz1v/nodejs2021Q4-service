const tasksRepo = require('./tasks.memory.repository');

const getAll = (boardId) => {
  const res = tasksRepo.getAllTasksByBoardId(boardId);
  return res;
};

const postTask = (boardId, newTaskData) => {
  const newTask = tasksRepo.postTasks(boardId, newTaskData);
  return newTask;
};

const getTaskById = (boardId, taskId) => {
  const result = tasksRepo.getTaskByBoardIdAndId(boardId, taskId);
  return result;
};

const updateTask = (boardId, taskId, newTaskInfo) => {
  const updatedTask = tasksRepo.updateTask(boardId, taskId, newTaskInfo);
  if (updatedTask === false) return false;
  return updatedTask;
};

const deleteTaskById = (boardId, taskId) => {
  const result = tasksRepo.deleteTaskById(boardId, taskId);
  return result;
};

module.exports = {
  getAll,
  postTask,
  getTaskById,
  updateTask,
  deleteTaskById,
};
