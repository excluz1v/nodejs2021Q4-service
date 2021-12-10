"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskRoutes = void 0;
const task_service_1 = require("./task.service");
const task_schema_1 = require("./task.schema");
function taskRoutes(fastify, options, done) {
    fastify.get('/boards/:boardId/tasks', task_schema_1.taskSchema.getTaskOpts, async (req, res) => {
        const { boardId } = req.params;
        const tasks = task_service_1.taskService.getAll(boardId);
        await res.send(tasks);
    });
    fastify.get('/boards/:boardId/tasks/:taskId', task_schema_1.taskSchema.getTaskByIdOpts, async (req, res) => {
        const { boardId, taskId } = req.params;
        const result = task_service_1.taskService.getTaskById(boardId, taskId);
        if (!result)
            await res.status(404).send('Task not found');
        await res.send(result);
    });
    fastify.post('/boards/:boardId/tasks', task_schema_1.taskSchema.postTasksOpts, async (req, res) => {
        const { body } = req;
        const { boardId } = req.params;
        const taskInfo = task_service_1.taskService.postTask(boardId, body);
        await res.status(201).send(taskInfo);
    });
    fastify.put('/boards/:boardId/tasks/:taskId', task_schema_1.taskSchema.putTaskOpts, async (req, res) => {
        const { body } = req;
        const { boardId, taskId } = req.params;
        const taskInfo = task_service_1.taskService.updateTask(boardId, taskId, body);
        await res.send(taskInfo);
    });
    fastify.delete('/boards/:boardId/tasks/:taskId', async (req, res) => {
        const { boardId, taskId } = req.params;
        const result = task_service_1.taskService.deleteTaskById(boardId, taskId);
        if (!result)
            await res.status(404).send('Task not found');
        void res.status(204);
    });
    done();
}
exports.taskRoutes = taskRoutes;
//# sourceMappingURL=task.router.js.map