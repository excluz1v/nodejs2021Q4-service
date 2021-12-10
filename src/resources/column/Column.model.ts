import { ColumnInterface } from 'src/ts/interfaces';
import { v4 as uuidv4 } from 'uuid';

export class Column implements ColumnInterface {
  constructor({ id = uuidv4(), title='', order = 0 }) {
    this.id = id;
    this.title = title;
    this.order = order;
  }

  id: string;

  title: string;

  order: number;
}