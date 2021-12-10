import { TaskInterface } from 'src/ts/interfaces';
import { v4 as uuidv4 } from 'uuid';

export class Task implements TaskInterface{
  constructor({
    id = uuidv4(),
    title='',
    order=0,
    description='',
    userId='',
    boardId = uuidv4(),
    columnId='',
  } = {}) {
    this.id = id;
    this.title = title;
    this.columnId = columnId;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
  }

  id: string;

  title: string;

  order: number;

  description: string;

  userId: string;

  boardId: string;

  columnId: string;

  static toResponse(task:Task) {
    const { id, title, order, description, userId } = task;
    return { id, title, order, description, userId };
  }
}