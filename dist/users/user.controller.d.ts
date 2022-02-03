import { UsersService } from './users.service';
export declare class UsersController {
    private userService;
    constructor(userService: UsersService);
    getAll(): Promise<import("./user.entity").UserEntity[]>;
}
