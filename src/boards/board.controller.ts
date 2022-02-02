import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { BoardsService } from './board.service';
import { CreateBoardDto, UpdateBoardDto } from './create-board.dto';

@Controller('boards')
export class BoardController {
  constructor(private readonly boardService: BoardsService) { }

  @Get()
  findAll() {
    return this.boardService.findAll();
  }

  @Get(':boardId')
  findOne(@Param('boardId') boardId: string) {
    return this.boardService.findOne(boardId);
  }

  @Post()
  create(@Body() createBoardDto: CreateBoardDto) {
    return this.boardService.create(createBoardDto);
  }

  @Put(':boardId')
  update(
    @Param('boardId') boardId: string,
    @Body() updateBoardDto: UpdateBoardDto,
  ) {
    return this.boardService.update(boardId, updateBoardDto);
  }

  @Delete(':boardId')
  remove(@Param('boardId') boardId: string) {
    return this.boardService.remove(boardId);
  }
}
