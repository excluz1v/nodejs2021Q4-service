import { FastifyInstance, FastifyPluginOptions } from "fastify";
import { requestTaskParams } from "src/ts/interfaces";
import  {taskService} from './task.service';
import  {taskSchema} from './task.schema';


export  function taskRoutes(fastify:FastifyInstance, options:FastifyPluginOptions, done:()=>void) {

  fastify.get<requestTaskParams>('/boards/:boardId/tasks', taskSchema.getTaskOpts, async (req, res) => {
    const { boardId } = req.params;
    const tasks = taskService.getAll(boardId);
    await res.send(tasks);
  });

  fastify.get<requestTaskParams>(
    '/boards/:boardId/tasks/:taskId',
    taskSchema.getTaskByIdOpts,
    async (req, res) => {
      const { boardId, taskId } = req.params;
      const result = taskService.getTaskById(boardId, taskId);
      if (!result) await res.status(404).send('Task not found');
     await res.send(result);
    }
  );

  fastify.post<requestTaskParams>('/boards/:boardId/tasks', taskSchema.postTasksOpts, async(req, res) => {
    const { body } = req;
    const { boardId } = req.params;
    const taskInfo = taskService.postTask(boardId, body);
   await res.status(201).send(taskInfo);
  });

  fastify.put<requestTaskParams>(
    '/boards/:boardId/tasks/:taskId',
    taskSchema.putTaskOpts,
   async (req, res) => {
      const { body } = req;
      const { boardId, taskId } = req.params;
      const taskInfo = taskService.updateTask(boardId, taskId, body);
     await res.send(taskInfo);
    }
  );

  fastify.delete<requestTaskParams>('/boards/:boardId/tasks/:taskId', async (req, res) => {
    const { boardId, taskId } = req.params;
    const result =  taskService.deleteTaskById(boardId, taskId);
    if (!result)await res.status(404).send('Task not found');
   void res.status(204);
  });
  done();
}