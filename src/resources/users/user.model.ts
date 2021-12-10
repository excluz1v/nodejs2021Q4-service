import { UserInterface } from 'src/ts/interfaces';
import { v4 as uuidv4 } from 'uuid';

export class User implements UserInterface{
  name:string;

  login:string;

  password:string;

  id:string;

  constructor({ id = uuidv4(), name='', login='', password='' } = {}) {
    this.id = id;
    this.name = name;
    this.login = login;
    this.password = password;
  }

/**
 * 
 * @param user User instance
 * @returns object with publick properties
 */
  static toResponse(user:UserInterface) {
    const { id, name, login } = user;
    return { id, name, login };
  }
}


