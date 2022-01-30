import {
  Entity,
  Column,
  BaseEntity,
  PrimaryColumn,
  getRepository,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { config } from 'src/config';

/** The class to create a user instance */
@Entity()
class User extends BaseEntity {
  @PrimaryColumn()
  id: string;

  @Column({
    length: 50,
  })
  name: string;

  @Column({
    length: 50,
  })
  login: string;

  @Column('character varying')
  password: string;

  /**
   * to create a user, the constructor takes:
   * @param name - user name
   * @param login - user's login
   * @param password - user password
   * @returns user object
   */

  constructor(name: string, login: string, password: string) {
    super();
    this.id = uuidv4();
    this.name = name;
    this.login = login;
    this.password = password;
  }

  static async login(login: string, password: string) {
    const user = await getRepository(this).findOne({
      where: {
        login,
      },
    });
    if (!user) return false;
    if (!bcrypt.compareSync(password, user.password)) return false;
    const token = jwt.sign(
      {
        userId: user.id,
        login: user.login,
      },
      config.JWT_SECRET_KEY,
    );
    return { token };
  }
}
export default User;
