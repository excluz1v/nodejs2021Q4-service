const boardsService = require('./board.service');
const schemas = require('./boards.schema');

function boardRoutes(fastify, options, done) {
  fastify.get('/boards', schemas.getBoardsOpts, (req, res) => {
    const boards = boardsService.getAll();
    res.send(boards);
  });

  fastify.get('/boards/:boardId', schemas.getBoardByIdOpts, (req, res) => {
    const { boardId } = req.params;
    const result = boardsService.getBoardById(boardId);
    if (result === false) res.status(404).send('Board not found');
    res.send(result);
  });

  fastify.post('/boards', schemas.postBoardsOpts, (req, res) => {
    const { body } = req;

    const boardInfo = boardsService.postBoard(body);
    res.status(201).send(boardInfo);
  });

  fastify.put('/boards/:boardId', schemas.putBoardOpts, (req, res) => {
    const { body } = req;
    const { boardId } = req.params;
    const boardInfo = boardsService.putBoard(boardId, body);
    if (boardInfo === false) res.status(400).send('Board not found');
    res.send(boardInfo);
  });

  fastify.delete('/boards/:boardId', (req, res) => {
    const { boardId } = req.params;
    const result = boardsService.deleteBoardById(boardId);
    if (result === false) res.status(404).send('Board not found');
    res.status(204).send();
  });

  done();
}

module.exports = boardRoutes;
