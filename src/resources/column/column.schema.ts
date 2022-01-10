// Columns options

const columnsWithId = {
  type: 'array',
  items: {
    type: 'object',
    properties: {
      id: { type: 'string' },
      title: { type: 'string' },
      order: { type: 'number' },
    },
  },
};

const columnsWithOutId = {
  type: 'array',
  items: {
    type: 'object',
    properties: {
      title: { type: 'string' },
      order: { type: 'number' },
    },
  },
};
export const columnSchema = { columnsWithId, columnsWithOutId };
