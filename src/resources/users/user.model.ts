import { UserInterface } from 'src/ts/interfaces';
import uuid from 'uuid';


const uuidv4: string = uuid.v4();

export class User implements UserInterface{
  name:string;

  login:string;

  password:string;

  id:string;

  constructor({ id = uuidv4, name='', login='', password='' } = {}) {
    this.id = id;
    this.name = name;
    this.login = login;
    this.password = password;
  }

  static toResponse(user:UserInterface) {
    const { id, name, login } = user;
    return { id, name, login };
  }
}


