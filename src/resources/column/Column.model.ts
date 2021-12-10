import { ColumnInterface } from 'src/ts/interfaces';
import uuid from 'uuid';

export class Column implements ColumnInterface {
  constructor({ id = uuid.v4(), title='', order = 0 }) {
    this.id = id;
    this.title = title;
    this.order = order;
  }

  id: string;

  title: string;

  order: number;
}