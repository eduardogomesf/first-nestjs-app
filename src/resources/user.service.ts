import { Injectable } from '@nestjs/common';
import { User } from './user';
import { UserRepository } from './user.repository';

type IUserCreate = Omit<User, 'id' | 'createdAt'>;

@Injectable()
export class UserService {
    constructor(private readonly userRepository: UserRepository) {}

    createUser(userData: IUserCreate): User {
        if (!userData.firstName || !userData.lastName || !userData.age) {
            throw new Error('All fields must be filled');
        }

        const user = this.userRepository.create(userData);

        return user;
    }

    findUsers(): User[] {
        const users = this.userRepository.find();

        return users;
    }
}
