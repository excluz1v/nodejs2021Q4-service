"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const fastify_swagger_1 = __importDefault(require("fastify-swagger"));
const path_1 = __importDefault(require("path"));
const user_router_1 = require("./resources/users/user.router");
const config_1 = require("./common/config");
const boards_router_1 = require("./resources/boards/boards.router");
const task_router_1 = require("./resources/tasks/task.router");
const server = (0, fastify_1.default)({ logger: true });
const start = async () => {
    try {
        await server.register(fastify_swagger_1.default, {
            mode: 'static',
            routePrefix: '/doc',
            specification: {
                path: path_1.default.resolve(__dirname, '../doc/api.yaml'),
                postProcessor(swaggerObject) {
                    return swaggerObject;
                },
                baseDir: __dirname,
            },
            exposeRoute: true,
        });
        await server.register(user_router_1.userRoutes);
        await server.register(boards_router_1.boardRoutes);
        await server.register(task_router_1.taskRoutes);
        await server.listen(config_1.config.PORT);
    }
    catch (err) {
        server.log.error(err);
        process.exit(1);
    }
};
void start();
//# sourceMappingURL=server.js.map