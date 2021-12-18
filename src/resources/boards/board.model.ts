import {  BoardInterface, ColumnInterface } from 'src/ts/interfaces';
import { v4 as uuidv4 } from 'uuid';
import {Column} from '../column/Column.model';


export class Board implements BoardInterface {
  constructor({ id = uuidv4(), title, columns }:BoardInterface) {
    this.id = id;
    this.title = title;
    this.columns = Board.createColumn(columns);
  }

  id: string;

  title: string;

  columns: ColumnInterface[];

/**
 * 
 * @param ArrOfColumns array of columns
 * @returns created array with Column instances
 */
  static createColumn(ArrOfColumns:ColumnInterface[]|[]) {
    return [...ArrOfColumns].map((col) => new Column(col));
  }
}