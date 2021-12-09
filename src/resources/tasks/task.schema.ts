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

// Options for GET ALL BOARDS
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

// Options for POST CREATE Task
const postTasksOpts = {
  schema: {
    body: {
      type: 'object',
      required: ['title', 'order', 'description', 'userId', 'boardId'],
      properties: createTaskSchema,
    },
  },
};

// Options for GET boards/:boardId/tasks/:taskId
const getTaskByIdOpts = {
  schema: {
    // response: {
    //   200: {
    //     type: 'object',
    //     properties: taskSchema,
    //   },
    // },
  },
};

// Options for PUT Task(Updates a Task by ID)
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

export const taskSchema = {
  getTaskOpts,
  postTasksOpts,
  getTaskByIdOpts,
  putTaskOpts,
};
