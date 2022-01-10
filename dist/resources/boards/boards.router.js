"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.boardRoutes = void 0;
const board_service_1 = require("./board.service");
const boards_schema_1 = require("./boards.schema");
function boardRoutes(fastify, options, done) {
    fastify.get('/boards', boards_schema_1.boardSchema.getBoardsOpts, async (req, res) => {
        const boards = board_service_1.boardsService.getAll();
        await res.send(boards);
    });
    fastify.get('/boards/:boardId', boards_schema_1.boardSchema.getBoardByIdOpts, async (req, res) => {
        const { boardId } = req.params;
        const result = board_service_1.boardsService.getBoardById(boardId);
        if (result === false)
            await res.status(404).send('Board not found');
        await res.send(result);
    });
    fastify.post('/boards', boards_schema_1.boardSchema.postBoardsOpts, async (req, res) => {
        const { body } = req;
        const boardInfo = board_service_1.boardsService.postBoard(body);
        await res.status(201).send(boardInfo);
    });
    fastify.put('/boards/:boardId', boards_schema_1.boardSchema.putBoardOpts, async (req, res) => {
        const { body } = req;
        const { boardId } = req.params;
        const boardInfo = board_service_1.boardsService.putBoard(boardId, body);
        if (boardInfo === false)
            await res.status(400).send('Board not found');
        await res.send(boardInfo);
    });
    fastify.delete('/boards/:boardId', async (req, res) => {
        const { boardId } = req.params;
        const result = board_service_1.boardsService.deleteBoardById(boardId);
        if (result === false)
            await res.status(404).send('Board not found');
        await res.status(204).send();
    });
    done();
}
exports.boardRoutes = boardRoutes;
//# sourceMappingURL=boards.router.js.map