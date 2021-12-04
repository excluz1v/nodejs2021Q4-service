const Task = require('./task.model');

let tasks = [];

const getAllTasksByBoardId = (boardId) => {
  const res = tasks.filter((task) => task.boardId === boardId);
  return res;
};

const getTaskByBoardIdAndId = (boardId, taskId) => {
  const res = tasks.filter(
    (task) => task.boardId === boardId && task.id === taskId
  );
  if (res.length === 0) return false;
  return res[0];
};

const postTasks = (boardId, taskData) => {
  const newTask = new Task({ ...taskData, boardId });
  tasks = [...tasks, newTask];
  return newTask;
};

const updateTask = (boardId, taskId, newTaskInfo) => {
  let taskIndex;
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
  const res = getAllTasksByBoardId(boardId, taskId);
  if (res) tasks = tasks.filter((task) => task.id !== taskId);
  return res;
};

const deleteAssignedUsers = (userId) => {
  tasks = tasks.map((task) => {
    if (task.userId === userId) {
      const nullUser = { userId: null };
      const updatedTask = { ...task, ...nullUser };
      return updatedTask;
    }
    return task;
  });
};

const deleteTaskByBoardId = async (boardId) => {
  tasks = tasks.filter((task) => task.boardId !== boardId);
};

module.exports = {
  getAllTasksByBoardId,
  getTaskByBoardIdAndId,
  postTasks,
  updateTask,
  deleteTaskById,
  deleteAssignedUsers,
  tasks,
  deleteTaskByBoardId,
};
