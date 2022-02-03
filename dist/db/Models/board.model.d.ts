import { BaseEntity } from 'typeorm';
import Columns from './Column.model';
declare class Board extends BaseEntity {
    id: string;
    title: string;
    columns: Columns[] | undefined;
    constructor(title: string, columns?: Columns[]);
}
export default Board;
