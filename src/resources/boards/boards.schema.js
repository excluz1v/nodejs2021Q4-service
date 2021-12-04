const columnsSchema = require('../column/column.schema');

// Options for GET ALL BOARDS
const getBoardsOpts = {
  schema: {
    response: {
      200: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            title: { type: 'string' },
            columns: columnsSchema.columnsWithId,
          },
        },
      },
    },
  },
};

// Options for POST CREATE BOARDS
const postBoardsOpts = {
  schema: {
    body: {
      type: 'object',
      required: ['title', 'columns'],
      properties: {
        title: { type: 'string' },
        columns: columnsSchema.columnsWithOutId,
      },
    },
    response: {
      201: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          title: { type: 'string' },
          columns: columnsSchema.columnsWithId,
        },
      },
    },
  },
};

// Options for GET boards/:boardId
const getBoardByIdOpts = {
  schema: {
    response: {
      200: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          title: { type: 'string' },
          columns: columnsSchema.columnsWithId,
        },
      },
    },
  },
};

// Options for PUT BOARD(Updates a Board by ID)
const putBoardOpts = {
  schema: {
    body: {
      type: 'object',
      required: ['title', 'columns'],
      properties: {
        title: { type: 'string' },
        columns: columnsSchema.columnsWithId,
      },
    },
    response: {
      200: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          title: { type: 'string' },
          columns: columnsSchema.columnsWithId,
        },
      },
    },
  },
};

module.exports = {
  getBoardsOpts,
  postBoardsOpts,
  getBoardByIdOpts,
  putBoardOpts,
};
