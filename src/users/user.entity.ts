import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  name: string;

  @Column({
    unique: true,
    type: 'text',
  })
  @Column('text')
  password: string;
}

export class UserEntity {
  id: string;
  name: string;
  login: string;

  @Exclude()
  password: string;

  constructor(entity: UserEntity) {
    Object.assign(this, entity);
  }
}
