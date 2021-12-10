import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import { requestBoardsParams } from 'src/ts/interfaces';
import {boardsService} from './board.service';
import {boardSchema} from './boards.schema';

export function boardRoutes(fastify:FastifyInstance, options:FastifyPluginOptions, done:()=>void) {

  fastify.get('/boards', boardSchema.getBoardsOpts, async (req, res) => {
    const boards = boardsService.getAll();
   await res.send(boards);
  });

  fastify.get<requestBoardsParams>('/boards/:boardId', boardSchema.getBoardByIdOpts,async (req, res) => {
    const { boardId } = req.params;
    const result = boardsService.getBoardById(boardId);
    if (result === false)await res.status(404).send('Board not found');
   await res.send(result);
  });

  fastify.post<requestBoardsParams>('/boards', boardSchema.postBoardsOpts,async (req, res) => {
    const { body } = req;

    const boardInfo = boardsService.postBoard(body);
   await res.status(201).send(boardInfo);
  });

  fastify.put<requestBoardsParams>('/boards/:boardId', boardSchema.putBoardOpts,async (req, res) => {
    const { body } = req;
    const { boardId } = req.params;
    const boardInfo = boardsService.putBoard(boardId, body);
    if (boardInfo === false) await res.status(400).send('Board not found');
   await res.send(boardInfo);
  });

  fastify.delete<requestBoardsParams>('/boards/:boardId',async (req, res) => {
    const { boardId } = req.params;
    const result = boardsService.deleteBoardById(boardId);
    if (result === false)await res.status(404).send('Board not found');
    await res.status(204).send();
  });

  done();
}