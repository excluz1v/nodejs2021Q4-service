import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardsService } from 'src/boards/board.service';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CreateTaskDto, UpdateTaskDto } from './task-dto';
import Task from './task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
    private boardService: BoardsService,
    private userService: UsersService,
  ) {}

  async getAllByBoardId(boardId: string) {
    const tasks = await this.taskRepository.find({
      relations: ['user', 'board'],
      where: { boardId },
    });
    return tasks;
  }

  async getOne({ taskId, boardId }: { taskId: string; boardId: string }) {
    const task = await this.taskRepository.findOne({
      where: {
        id: taskId,
        boardId,
      },
      relations: ['user', 'board'],
    });

    if (!task) {
      throw new NotFoundException();
    }
    return {
      id: task.id,
      title: task.title,
      order: task.order,
      description: task.description,
      userId: task.userId,
      user: task.user,
      board: task.board,
      boardId: task.boardId,
      columnId: task.columnId,
    };
  }

  async create(boardId: string, taskCreateData: CreateTaskDto) {
    const board = await this.boardService.findOne(boardId);
    if (!board) {
      throw new NotFoundException();
    }
    const { title, order, description, columnId, userId } = taskCreateData;
    const user = await this.userService.getSingleUser(userId);
    // const newTask = new Task(title, order, description, columnId, board, user);
    // await this.taskRepository.save(newTask);

    // return {
    //   id: newTask.id,
    //   title: newTask.title,
    //   order: newTask.order,
    //   description: newTask.description,
    //   userId: newTask.userId,
    //   boardId: newTask.boardId,
    //   columnId: newTask.columnId,
    // };
  }

  async update(
    { boardId, taskId }: { boardId: string; taskId: string },
    updatedTask: UpdateTaskDto,
  ) {
    let task = await this.taskRepository.findOne({ id: taskId, boardId });

    if (!task) {
      throw new NotFoundException();
    }

    Object.assign(task, updatedTask);

    task = await this.taskRepository.save(task);

    return {
      title: task.title,
      order: task.order,
      description: task.description,
      userId: task.userId,
      boardId,
      columnId: task.columnId,
    };
  }

  async del({
    boardId,
    taskId,
  }: {
    boardId: string;
    taskId: string;
  }): Promise<void> {
    const task = await this.taskRepository.findOne(taskId);
    await this.taskRepository.remove(task);
  }

  async unassignUser(userId: string): Promise<void> {
    await this.taskRepository.update(
      {
        userId,
      },
      { userId: null },
    );
  }
}
