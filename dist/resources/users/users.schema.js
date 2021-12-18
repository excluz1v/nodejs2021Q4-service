"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSchema = void 0;
const getUserOpts = {
    schema: {
        response: {
            200: {
                type: 'array',
                items: {
                    type: 'object',
                    properties: {
                        id: { type: 'string' },
                        name: { type: 'string' },
                        login: { type: 'string' },
                    },
                },
            },
        },
    },
};
const postUserOpts = {
    schema: {
        body: {
            type: 'object',
            required: ['name', 'login', 'password'],
            properties: {
                name: { type: 'string' },
                login: { type: 'string' },
                password: { type: 'string' },
            },
        },
        response: {
            201: {
                type: 'object',
                properties: {
                    id: { type: 'string' },
                    name: { type: 'string' },
                    login: { type: 'string' },
                },
            },
        },
    },
};
const getUserByIdOpts = {
    schema: {
        response: {
            200: {
                type: 'object',
                properties: {
                    id: { type: 'string' },
                    name: { type: 'string' },
                    login: { type: 'string' },
                },
            },
        },
    },
};
const putUserOpts = {
    schema: {
        body: {
            type: 'object',
            required: ['name', 'login', 'password'],
            properties: {
                name: { type: 'string' },
                login: { type: 'string' },
                password: { type: 'string' },
            },
        },
        response: {
            200: {
                type: 'object',
                properties: {
                    id: { type: 'string' },
                    name: { type: 'string' },
                    login: { type: 'string' },
                },
            },
        },
    },
};
exports.userSchema = {
    getUserOpts,
    postUserOpts,
    getUserByIdOpts,
    putUserOpts,
};
//# sourceMappingURL=users.schema.js.map