import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Columns from 'src/columns/column.entity';
import { Repository } from 'typeorm';
import Board from './board.entity';
import { CreateBoardDto, UpdateBoardDto } from './create-board.dto';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(Board) private boardsRepository: Repository<Board>,
    @InjectRepository(Columns)
    private readonly columnRepository: Repository<Columns>,
  ) { }

  async create(createBoardDto: CreateBoardDto) {
    try {
      const { title, columns } = createBoardDto;
      const newBoard = new Board(title);
      const newColumns = columns.map(
        (item) => new Columns(item.order, item.title, newBoard),
      );
      await Board.save(newBoard);
      await Columns.save(newColumns);
      const board = await Board.findOne(newBoard.id, {
        relations: ['columns'],
      });
      return board;
    } catch (err) {
      throw new NotFoundException();
    }
  }
  async findAll() {
    const result = await this.boardsRepository.find({
      relations: ['columns'],
    });
    return result;
  }

  async findOne(id: string) {
    const board = await this.boardsRepository.findOne(id, {
      relations: ['columns'],
    });
    if (!board) throw new NotFoundException();
    const result =
      board.columns === null
        ? board
        : {
          ...board,
          columns: board.columns?.map((item) => ({ ...item })),
        };
    console.log(result);
    return result;
  }

  async update(id: string, updateBoardDto: UpdateBoardDto) {
    const board = await this.boardsRepository.findOne(id);
    if (!board) {
      throw new NotFoundException();
    }
    this.boardsRepository.merge(board, updateBoardDto);
    await this.boardsRepository.save(board);
    return board;
  }
  async remove(id: string) {
    return this.boardsRepository.delete(id);
  }
}
