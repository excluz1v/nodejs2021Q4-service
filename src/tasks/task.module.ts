import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Board from 'src/boards/board.entity';
import { BoardModule } from 'src/boards/board.module';
import User from 'src/users/user.entity';
import { UsersModule } from 'src/users/users.module';
import Task from './task.entity';
import { TasksService } from './task.service';
import { TasksController } from './tasks.contoller';

@Module({
  controllers: [TasksController],
  providers: [TasksService],
  imports: [
    TypeOrmModule.forFeature([Task]),
    BoardModule,
    UsersModule,
    TypeOrmModule.forFeature([Board]),
    TypeOrmModule.forFeature([User]),
  ],
  exports: [TasksService],
})
export class TasksModule {}
