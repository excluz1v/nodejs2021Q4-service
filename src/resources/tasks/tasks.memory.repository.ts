import { nullUserType, taskType } from 'src/ts/types';
import {Task} from './task.model';

let tasks:[]|Task[] = [];

const getAllTasksByBoardId = (boardId:string) => {
  const res = tasks.filter((task:Task) => task.boardId === boardId);
  return res;
};

const getTaskByBoardIdAndId = (boardId:string, taskId:string) => {
  const res = tasks.filter(
    (task:Task) => task.boardId === boardId && task.id === taskId
  );
  if (res.length === 0) return false;
  return res[0];
};

const postTasks = (boardId:string, taskData:taskType) => {
  const newTask = new Task({ ...taskData, boardId });
  tasks = [...tasks, newTask];
  return newTask;
};

const updateTask = (boardId:string, taskId:string, newTaskInfo:taskType) => {
  let taskIndex:number;
  tasks = tasks.map((task:Task, index) => {
    if (task.id === taskId) {
      taskIndex = index;
      return { ...task, ...newTaskInfo };
    }
    return task;
  });
  return tasks[taskIndex];
};

const deleteTaskById = (boardId:string, taskId:string) => {
  const res = getAllTasksByBoardId(boardId);
  if (res) tasks = tasks.filter((task:Task) => task.id !== taskId);
  return res;
};

const deleteAssignedUsers = (userId:string) => {
  tasks = tasks.map((task:Task) => {
    if (task.userId === userId) {
      const nullUser:nullUserType = { "userId": null };
      const updatedTask = { ...task, ...nullUser };
      return updatedTask;
    }
    return task;
  });
};

const deleteTaskByBoardId =  (boardId:string) => {
  tasks = tasks.filter((task:Task) => task.boardId !== boardId);
};

export = {
  getAllTasksByBoardId,
  getTaskByBoardIdAndId,
  postTasks,
  updateTask,
  deleteTaskById,
  deleteAssignedUsers,
  tasks,
  deleteTaskByBoardId,
};
