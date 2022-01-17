import {
  Entity,
  Column,
  BaseEntity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import Board from '../boards/board.model';
import User from '../users/user.model';

@Entity()
class Task extends BaseEntity {
  @PrimaryColumn()
  id: string;

  @Column('text')
  title: string;

  @Column()
  order: number;

  @Column('text')
  description: string;

  @Column({ nullable: true })
  userId: string | null;

  @ManyToOne(() => User, (task) => task.id, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'userId' })
  user: User | null;

  @Column()
  boardId: string;

  @ManyToOne(() => Board, (board) => board.id, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'boardId' })
  board: Board;

  @Column({
    type: 'text',
    nullable: true,
  })
  columnId: string | null;

  constructor(
    title: string,
    order: number,
    description: string,
    columnId: string | null,
    board: Board,
    user: User | null,
    boardId = '',
    userId: string | null = null
  ) {
    super();
    this.id = uuidv4();
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.user = user;
    this.boardId = boardId;
    this.columnId = columnId;
    this.board = board;
  }
}

export default Task;
