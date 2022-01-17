import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import {
  GetSingleTaskReqParams,
  GetTasksReqParams,
  PostTaskReqParams,
} from 'src/ts/interfaces';
import { taskSchema } from './task.schema';
import User from '../users/user.model';
import Task from './task.model';
import Board from '../boards/board.model';

const getUser = async (id: string | null): Promise<User | null> => {
  if (typeof id === 'string') {
    const user = await User.findOne(id);
    return user === undefined ? null : user;
  }
  return null;
};

export function taskRoutes(
  fastify: FastifyInstance,
  options: FastifyPluginOptions,
  done: () => void
) {
  fastify.get<GetTasksReqParams>(
    '/boards/:boardId/tasks',
    taskSchema.getTaskOpts,
    async (req, res) => {
      try {
        const { boardId } = req.params;
        const tasks = await Task.find({
          relations: ['user', 'board'],
          where: { boardId },
        });
        await res.send(tasks);
      } catch (error) {
        console.log(error);
      }
    }
  );

  fastify.get<GetSingleTaskReqParams>(
    '/boards/:boardId/tasks/:taskId',
    taskSchema.getTaskByIdOpts,
    async (req, res) => {
      try {
        const { boardId, taskId } = req.params;
        const task = await Task.findOne({
          where: { boardId, id: taskId },
        });
        if (task) {
          await res.send({
            id: task.id,
            title: task.title,
            order: task.order,
            description: task.description,
            userId: task.userId,
            boardId: task.boardId,
            columnId: task.columnId,
          });
        } else await res.status(404).send('Task not found');
      } catch (error) {
        console.log(error);
      }
    }
  );

  fastify.post<PostTaskReqParams>(
    '/boards/:boardId/tasks',
    taskSchema.postTasksOpts,
    async (req, res) => {
      try {
        const { boardId } = req.params;
        const board = await Board.findOne(boardId);
        if (board) {
          const { title, order, description, userId, columnId } = req.body;

          const user = await getUser(userId);

          const newTask = new Task(
            title,
            order,
            description,
            columnId,
            board,
            user
          );
          await Task.save(newTask).then((r) =>
            res.status(201).send({
              id: newTask.id,
              title: newTask.title,
              order: newTask.order,
              description: newTask.description,
              userId: newTask.userId,
              boardId: newTask.boardId,
              columnId: newTask.columnId,
            })
          );
        } else await res.status(404).send(`Board ${boardId} is not found`);
      } catch (error) {
        console.log(error);
      }
    }
  );

  fastify.put<PostTaskReqParams>(
    '/boards/:boardId/tasks/:taskId',
    taskSchema.putTaskOpts,
    async (req, res) => {
      try {
        const { boardId, taskId } = req.params;
        const task = await Task.findOne(taskId);
        if (task) {
          const { title, order, description, userId, columnId } = req.body;

          const user = userId === null ? null : await getUser(userId);

          task.title = title || task.title;
          task.order = order || task.order;
          task.description = description || task.description;
          task.user = user;
          task.columnId = columnId || task.columnId;

          await Task.save(task);
          await res.send({
            id: task.id,
            title: task.title,
            order: task.order,
            description: task.description,
            userId: task.userId,
            boardId: task.boardId,
            columnId: task.columnId,
          });
        } else
          await res
            .status(404)
            .send(`Task ${taskId} not found in the board ${boardId}`);
      } catch (error) {
        console.log(error);
      }
    }
  );

  fastify.delete<GetSingleTaskReqParams>(
    '/boards/:boardId/tasks/:taskId',
    async (req, res) => {
      try {
        const { taskId } = req.params;
        const task = await Task.findOne(taskId);

        if (task) {
          await Task.remove(task);
          await res.send('task has been deleted');
        } else await res.status(404).send('Task not found');
      } catch (error) {
        console.log(error);
      }
    }
  );
  done();
}
