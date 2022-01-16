import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import {
  GetBoardReqParams,
  PostBoardReqParams,
  PutBoardReqParams,
} from 'src/ts/interfaces';
import Columns from '../column/Column.model';
import Board from './board.model';
import { boardSchema } from './boards.schema';

export function boardRoutes(
  fastify: FastifyInstance,
  options: FastifyPluginOptions,
  done: () => void
) {
  fastify.get('/boards', boardSchema.getBoardsOpts, async (req, res) => {
    try {
      const boards = await Board.find({ relations: ['columns'] });
      await res.send(boards);
    } catch (error) {
      console.log(error);
    }
  });

  fastify.get<GetBoardReqParams>(
    '/boards/:boardId',
    boardSchema.getBoardByIdOpts,
    async (req, res) => {
      try {
        const { boardId } = req.params;
        const board = await Board.findOne(boardId, { relations: ['columns'] });

        if (board) {
          const result =
            board.columns === null
              ? board
              : {
                  ...board,
                  columns: board.columns?.map((item) => ({ ...item })),
                };

          await res.send(result);
        } else await res.status(404).send('Board not found');
      } catch (error) {
        console.log(error);
      }
    }
  );

  fastify.post<PostBoardReqParams>(
    '/boards',
    boardSchema.postBoardsOpts,
    async (req, res) => {
      try {
        const { title, columns } = req.body;
        const newBoard = new Board(title);

        const newColumns = columns.map(
          (item) => new Columns(item.order, item.title, newBoard)
        );

        await Board.save(newBoard);
        await Columns.save(newColumns);
        const board = await Board.findOne(newBoard.id, {
          relations: ['columns'],
        });
        await res.code(201).send(board);
      } catch (error) {
        console.log(error);
      }
    }
  );

  fastify.put<PutBoardReqParams>(
    '/boards/:boardId',
    boardSchema.putBoardOpts,
    async (req, res) => {
      try {
        const { title } = req.body;
        const { boardId } = req.params;
        const board = await Board.findOne(boardId, { relations: ['columns'] });

        if (board) {
          board.title = title || board.title;
          await Board.save(board);
          await res.send(board);
        } else await res.status(404).send('Board not found');
      } catch (error) {
        console.log(error);
      }
    }
  );

  fastify.delete<GetBoardReqParams>('/boards/:boardId', async (req, res) => {
    try {
      const { boardId } = req.params;
      const board = await Board.findOne(boardId);

      if (board) {
        await Board.remove(board);
        await res.status(204).send();
      } else await res.status(404).send('Board not found');
    } catch (error) {
      console.log(error);
    }
  });

  done();
}
