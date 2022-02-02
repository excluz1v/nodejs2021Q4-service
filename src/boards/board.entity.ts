import { BoardColumn } from 'src/columns/column.entity';
import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Board {
  @Index()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @OneToMany(() => BoardColumn, (column) => column.board, {
    cascade: true,
  })
  columns: BoardColumn[];
}
