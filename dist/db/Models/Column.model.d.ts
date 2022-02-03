import { BaseEntity } from 'typeorm';
export interface IBoard {
    id: string;
    title: string;
}
declare class Columns extends BaseEntity {
    id: string;
    order: number;
    title: string;
    board: IBoard;
    constructor(order: number, title: string, board: IBoard);
}
export default Columns;
