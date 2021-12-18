import { nullUserType, taskType } from 'src/ts/types';
import {Task} from './task.model';

let tasks:[]|Task[] = [];

/**
 * receive all tasks by board id
 * @param boardId board id string
 * @returns tasks if tasks exist in database or empty array
 */

const getAllTasksByBoardId = (boardId:string):[]|Task[] => {
  const res = tasks.filter((task:Task) => task.boardId === boardId);
  return res;
};

/**
 * receive single task by board id and task id
 * @param boardId board id string
 * @param taskId task id string
 * @returns single task if task exist in database
 */

const getTaskByBoardIdAndId = (boardId:string, taskId:string) => {
  const res = tasks.filter(
    (task:Task) => task.boardId === boardId && task.id === taskId
  );
  if (res.length === 0) return false;
  return res[0];
};

/**
 * create new task in existing board
 * @param boardId  board id string
 * @param taskData task data object 
 * @returns fresh created task
 */

const postTasks = (boardId:string, taskData:taskType) => {
  const newTask = new Task({ ...taskData, boardId });
  tasks = [...tasks, newTask];
  return newTask;
};

/**
 * update task data in existing board
 * @param taskId task id string
 * @param newTaskInfo new task data
 * @returns updated task data
 */

const updateTask = (boardId:string,taskId:string, newTaskInfo:taskType) => {
  let taskIndex=0;
  tasks = tasks.map((task:Task, index) => {
    if (task.id === taskId && boardId===task.boardId) {
      taskIndex = index;
      return { ...task, ...newTaskInfo };
    }
    return task;
  });
  return tasks[taskIndex];
};

/**
 * delete task from database by board id and task id
 * @param boardId board id string
 * @param taskId task id string
 * @returns filtered array of tasks or empty array
 */

const deleteTaskById = (boardId:string, taskId:string) => {
  const res = getAllTasksByBoardId(boardId);
  if (res) tasks = tasks.filter((task:Task) => task.id !== taskId);
  return res;
};

/**
 * delete users that were assigned to certain task 
 * @param userId user id string
 * @returns void
 */

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

/**
 * delete all task by board id
 * @param boardId board id string
 *  @returns void
 */

const deleteTaskByBoardId =  (boardId:string) => {
  tasks = tasks.filter((task:Task) => task.boardId !== boardId);
};

export const tasksRepo = {
  getAllTasksByBoardId,
  getTaskByBoardIdAndId,
  postTasks,
  updateTask,
  deleteTaskById,
  deleteAssignedUsers,
  tasks,
  deleteTaskByBoardId,
};
