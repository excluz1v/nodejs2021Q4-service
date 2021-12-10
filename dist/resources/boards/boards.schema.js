"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.boardSchema = void 0;
const column_schema_1 = require("../column/column.schema");
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
                        columns: column_schema_1.columnSchema.columnsWithId,
                    },
                },
            },
        },
    },
};
const postBoardsOpts = {
    schema: {
        body: {
            type: 'object',
            required: ['title', 'columns'],
            properties: {
                title: { type: 'string' },
                columns: column_schema_1.columnSchema.columnsWithOutId,
            },
        },
        response: {
            201: {
                type: 'object',
                properties: {
                    id: { type: 'string' },
                    title: { type: 'string' },
                    columns: column_schema_1.columnSchema.columnsWithId,
                },
            },
        },
    },
};
const getBoardByIdOpts = {
    schema: {
        response: {
            200: {
                type: 'object',
                properties: {
                    id: { type: 'string' },
                    title: { type: 'string' },
                    columns: column_schema_1.columnSchema.columnsWithId,
                },
            },
        },
    },
};
const putBoardOpts = {
    schema: {
        body: {
            type: 'object',
            required: ['title', 'columns'],
            properties: {
                title: { type: 'string' },
                columns: column_schema_1.columnSchema.columnsWithId,
            },
        },
        response: {
            200: {
                type: 'object',
                properties: {
                    id: { type: 'string' },
                    title: { type: 'string' },
                    columns: column_schema_1.columnSchema.columnsWithId,
                },
            },
        },
    },
};
exports.boardSchema = {
    getBoardsOpts,
    postBoardsOpts,
    getBoardByIdOpts,
    putBoardOpts,
};
//# sourceMappingURL=boards.schema.js.map