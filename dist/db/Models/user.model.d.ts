import { BaseEntity } from 'typeorm';
declare class User extends BaseEntity {
    id: string;
    name: string;
    login: string;
    password: string;
    constructor(name: string, login: string, password: string);
    static login(login: string, password: string): Promise<false | {
        token: any;
    }>;
}
export default User;
