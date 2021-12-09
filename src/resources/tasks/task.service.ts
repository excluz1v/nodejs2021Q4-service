import { taskType } from 'src/ts/types';
import  {tasksRepo} from './tasks.memory.repository';

const getAll = (boardId:string) => {
  const res = tasksRepo.getAllTasksByBoardId(boardId);
  return res;
};

const postTask = (boardId:string, newTaskData:taskType) => {
  const newTask = tasksRepo.postTasks(boardId, newTaskData);
  return newTask;
};

const getTaskById = (boardId:string, taskId:string) => {
  const result = tasksRepo.getTaskByBoardIdAndId(boardId, taskId);
  return result;
};

const updateTask = (boardId:string, taskId:string, newTaskInfo:taskType) => {
  const updatedTask = tasksRepo.updateTask( taskId, newTaskInfo);
  // if (updatedTask === false) return false;
  return updatedTask;
};

const deleteTaskById = (boardId:string, taskId:string) => {
  const result = tasksRepo.deleteTaskById(boardId, taskId);
  return result;
};

export const taskService = {
  getAll,
  postTask,
  getTaskById,
  updateTask,
  deleteTaskById,
};
