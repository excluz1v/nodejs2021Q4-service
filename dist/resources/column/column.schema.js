"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.columnSchema = void 0;
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
exports.columnSchema = { columnsWithId, columnsWithOutId };
//# sourceMappingURL=column.schema.js.map