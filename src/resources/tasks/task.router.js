const taskService = require('./task.service');
const schemas = require('./task.schema');

async function taskRoutes(fastify, options, done) {
  fastify.get('/boards/:boardId/tasks', schemas.getTaskOpts, (req, res) => {
    const { boardId } = req.params;
    const tasks = taskService.getAll(boardId);
    res.send(tasks);
  });

  fastify.get(
    '/boards/:boardId/tasks/:taskId',
    schemas.getTaskByIdOpts,
    (req, res) => {
      const { boardId, taskId } = req.params;
      const result = taskService.getTaskById(boardId, taskId);
      if (!result) res.status(404).send('Task not found');
      res.send(result);
    }
  );

  fastify.post('/boards/:boardId/tasks', schemas.postTasksOpts, (req, res) => {
    const { body } = req;
    const { boardId } = req.params;
    const taskInfo = taskService.postTask(boardId, body);
    res.status(201).send(taskInfo);
  });

  fastify.put(
    '/boards/:boardId/tasks/:taskId',
    schemas.putTaskOpts,
    (req, res) => {
      const { body } = req;
      const { boardId, taskId } = req.params;
      const taskInfo = taskService.updateTask(boardId, taskId, body);
      res.send(taskInfo);
    }
  );

  fastify.delete('/boards/:boardId/tasks/:taskId', async (req, res) => {
    const { boardId, taskId } = req.params;
    const result = await taskService.deleteTaskById(boardId, taskId);
    if (!result) res.status(404).send('Task not found');
    res.status(204);
  });

  done();
}

module.exports = taskRoutes;
