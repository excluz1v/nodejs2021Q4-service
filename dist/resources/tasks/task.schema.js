"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskSchema = void 0;
const taskResponseBody = {
    id: { type: 'string' },
    title: { type: 'string' },
    order: { type: 'number' },
    description: { type: 'string' },
    userId: { type: ['string', 'null'] },
};
const createTaskSchema = {
    id: { type: 'string' },
    title: { type: 'string' },
    order: { type: 'number' },
    description: { type: 'string' },
    userId: { type: ['string', 'null'] },
    boardId: { type: ['string', 'null'] },
    columnId: { type: ['string', 'null'] },
};
const getTaskOpts = {
    schema: {
        response: {
            200: {
                type: 'array',
                items: {
                    type: 'object',
                    properties: createTaskSchema,
                },
            },
        },
    },
};
const postTasksOpts = {
    schema: {
        body: {
            type: 'object',
            required: ['title', 'order', 'description', 'userId', 'boardId'],
            properties: createTaskSchema,
        },
    },
};
const getTaskByIdOpts = {
    schema: {},
};
const putTaskOpts = {
    schema: {
        body: {
            type: 'object',
            required: [
                'title',
                'order',
                'description',
                'userId',
                'boardId',
                'columnId',
            ],
            properties: createTaskSchema,
        },
        response: {
            200: {
                type: 'object',
                properties: taskResponseBody,
            },
        },
    },
};
exports.taskSchema = {
    getTaskOpts,
    postTasksOpts,
    getTaskByIdOpts,
    putTaskOpts,
};
//# sourceMappingURL=task.schema.js.map