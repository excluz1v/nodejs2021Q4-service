import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardColumn } from 'src/columns/column.entity';
import { Board } from './board.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Board]),
    TypeOrmModule.forFeature([BoardColumn]),
  ],
  controllers: [],
  providers: [],
})
export class BoardModule { }
