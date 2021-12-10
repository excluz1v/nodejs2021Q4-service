"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const users_schema_1 = require("./users.schema");
const user_service_1 = require("./user.service");
function userRoutes(fastify, options, done) {
    console.log('1');
    fastify.get('/users', users_schema_1.userSchema.getUserOpts, async (req, res) => {
        const users = user_service_1.usersService.getAll();
        try {
            await res.send(users);
        }
        catch (error) {
            await res.send(404);
        }
    });
    fastify.get('/users/:userId', users_schema_1.userSchema.getUserByIdOpts, async (req, res) => {
        const { userId } = req.params;
        const result = user_service_1.usersService.getUserById(userId);
        if (result === false)
            await res.status(400).send('User not found');
        try {
            await res.send(result);
        }
        catch (error) {
            await res.send(404);
        }
    });
    fastify.post('/users', users_schema_1.userSchema.postUserOpts, async (req, res) => {
        const { body } = req;
        const userInfo = user_service_1.usersService.postUser(body);
        await res.status(201).send(userInfo);
    });
    fastify.put('/users/:userId', users_schema_1.userSchema.putUserOpts, async (req, res) => {
        const { body } = req;
        const { userId } = req.params;
        const userInfo = user_service_1.usersService.putUser(userId, body);
        if (userInfo === false)
            await res.status(400).send('User not found');
        try {
            await res.send(userInfo);
        }
        catch (error) {
            await res.send(404);
        }
    });
    fastify.delete('/users/:userId', async (req, res) => {
        const { userId } = req.params;
        const result = user_service_1.usersService.deleteUserById(userId);
        if (result === false)
            await res.status(404).send('User not found');
        try {
            await res.status(204).send();
        }
        catch (error) {
            await res.send(404);
        }
    });
    done();
}
exports.userRoutes = userRoutes;
//# sourceMappingURL=user.router.js.map