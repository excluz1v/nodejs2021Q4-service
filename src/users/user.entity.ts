import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @Index()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  login: string;

  @Column({ select: false })
  password: string;

  static toResponse(user: User) {
    const { password, ...rest } = user;
    return rest;
  }
}
