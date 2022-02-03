import { Repository } from 'typeorm';
import { CreateuserDto, UpdateuserDto } from './create-user.dto';
import { User, UserEntity } from './user.entity';
export declare class UsersService {
    private userRepository;
    constructor(userRepository: Repository<User>);
    hashPassword(pass: string): string;
    createUser(dto: CreateuserDto): Promise<UserEntity>;
    getAllusers(): Promise<UserEntity[]>;
    getSingleUser(userId: string): Promise<UserEntity>;
    update(userId: string, updateuserDto: UpdateuserDto): Promise<UserEntity>;
    del(userId: string): Promise<void>;
}
