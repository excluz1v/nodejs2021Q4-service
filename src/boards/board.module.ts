import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Columns from 'src/columns/column.entity';
import { BoardController } from './board.controller';
import Board from './board.entity';
import { BoardsService } from './board.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Board]),
    TypeOrmModule.forFeature([Columns]),
    BoardModule,
  ],
  controllers: [BoardController],
  providers: [BoardsService],
  exports: [BoardsService],
})
export class BoardModule { }
