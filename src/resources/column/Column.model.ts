import { ColumnInterface } from 'src/ts/interfaces';
import uuid from 'uuid';

const uuidv4: string = uuid.v4();

export class Column implements ColumnInterface {
  constructor({ id = uuidv4, title='', order = 0 }) {
    this.id = id;
    this.title = title;
    this.order = order;
  }

  id: string;

  title: string;

  order: number;
}