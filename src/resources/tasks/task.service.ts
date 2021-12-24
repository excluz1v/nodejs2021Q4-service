import { taskType } from 'src/ts/types';
import  {tasksRepo} from './tasks.memory.repository';

/**
 * receive all tasks by board id
 * @param boardId board id string
 * @returns tasks if tasks exist in database or empty array
 */

const getAll = (boardId:string) => {
  const res = tasksRepo.getAllTasksByBoardId(boardId);
  return res;
};

/**
 * create new task in existing board
 * @param boardId board id string
 * @param newTaskData task data object 
 * @returns fresh created task
 */

const postTask = (boardId:string, newTaskData:taskType) => {
  const newTask = tasksRepo.postTasks(boardId, newTaskData);
  return newTask;
};

/**
 * receive single task by board id and task id
 * @param boardId board id string
 * @param taskId task id string
 * @returns single task if task exist in database
 */

const getTaskById = (boardId:string, taskId:string) => {
  const result = tasksRepo.getTaskByBoardIdAndId(boardId, taskId);
  return result;
};

/**
 * update task data in existing board
 * @param taskId 
 * @param newTaskInfo new task data
 * @returns updated task data
 */

const updateTask = ( boardId:string, taskId:string, newTaskInfo:taskType) => {
  const updatedTask = tasksRepo.updateTask( boardId,taskId, newTaskInfo);
  // if (updatedTask === false) return false;
  return updatedTask;
};

/**
 * delete task from database by board id and task id
 * @param boardId board id string
 * @param taskId task id string
 * @returns filtered array of tasks or empty array
 */
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
