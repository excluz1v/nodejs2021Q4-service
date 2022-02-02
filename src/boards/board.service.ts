import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardColumn } from 'src/columns/column.entity';
import { Repository } from 'typeorm';
import { Board } from './board.entity';
import { CreateBoardDto, UpdateBoardDto } from './create-board.dto';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(Board) private boardsRepository: Repository<Board>,
    @InjectRepository(BoardColumn)
    private readonly columnRepository: Repository<BoardColumn>,
  ) { }

  async create(createBoardDto: CreateBoardDto) {
    const newBoard = this.boardsRepository.create(createBoardDto);
    const columns = newBoard.columns;
    columns.map((column) => this.columnRepository.create(column));
    newBoard.columns = [...columns];
    return this.boardsRepository.save(newBoard);
  }
  async findAll() {
    return this.boardsRepository.find({
      relations: ['columns'],
    });
  }

  async findOne(id: string) {
    const board = await this.boardsRepository.findOne(id, {
      relations: ['columns'],
    });
    if (!board) throw new NotFoundException();
    return board;
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
