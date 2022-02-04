import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Board from 'src/boards/board.entity';
import User from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './task-dto';
import Task from './task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
    @InjectRepository(Board)
    private boardRepository: Repository<Board>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) { }

  async getAllByBoardId(boardId: string) {
    const tasks = await this.taskRepository.find({
      relations: ['user', 'board'],
      where: { boardId },
    });

    return tasks.map((task) => Task.toResponse(task));
  }

  async getOne({ taskId, boardId }: { taskId: string; boardId: string }) {
    const task = await this.taskRepository.findOne({
      where: {
        id: taskId,
        boardId,
      },
    });
    if (!task) {
      throw new NotFoundException();
    }
    return Task.toResponse(task);
  }

  async create(boardId: string, taskCreateData: CreateTaskDto) {
    const board = await this.boardRepository.findOne(boardId);
    if (board) {
      const { title, order, description, columnId, userId } = taskCreateData;
      const user =
        userId === null ? null : await this.userRepository.findOne(userId);
      const newTask = new Task(
        title,
        order,
        description,
        columnId,
        board,
        user,
        boardId,
        userId,
      );
      await this.taskRepository.save(newTask);
      return Task.toResponse(newTask);
    } else throw new NotFoundException();
  }

  async update(
    { boardId, taskId }: { boardId: string; taskId: string },
    updatedData: CreateTaskDto,
  ) {
    const task = await this.taskRepository.findOne({
      where: {
        id: taskId,
        boardId,
      },
    });
    if (!task) {
      throw new NotFoundException();
    }
    const { userId, title, order, columnId, description } = updatedData;

    const user =
      userId !== null ? await this.userRepository.findOne(userId) : null;

    task.title = title || task.title;
    task.order = order || task.order;
    task.description = description || task.description;
    task.user = user;
    task.columnId = columnId || task.columnId;
    await this.taskRepository.save(task);
    return Task.toResponse(task);
  }

  async del({
    boardId,
    taskId,
  }: {
    boardId: string;
    taskId: string;
  }): Promise<void> {
    const task = await this.taskRepository.findOne(taskId);
    if (!task) throw new NotFoundException();
    await this.taskRepository.remove(task);
  }
}
