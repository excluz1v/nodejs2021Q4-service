import { BaseEntity } from 'typeorm';
import Board from './board.model';
import User from './user.model';
declare class Task extends BaseEntity {
    id: string;
    title: string;
    order: number;
    description: string;
    userId: string | null;
    user: User | null;
    boardId: string;
    board: Board;
    columnId: string | null;
    constructor(title: string, order: number, description: string, columnId: string | null, board: Board, user: User | null, boardId?: string, userId?: string | null);
}
export default Task;
