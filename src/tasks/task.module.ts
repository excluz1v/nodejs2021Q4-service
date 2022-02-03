import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardModule } from 'src/boards/board.module';
import { UsersModule } from 'src/users/users.module';
import Task from './task.entity';
import { TasksService } from './task.service';
import { TasksController } from './tasks.contoller';

@Module({
  controllers: [TasksController],
  providers: [TasksService],
  imports: [TypeOrmModule.forFeature([Task]), BoardModule, UsersModule],
  exports: [TasksService],
})
export class TasksModule { }
