import { HttpException, Injectable } from '@nestjs/common';
import { PasswordUtil } from 'src/utils/password.util';
import { User } from '../entities/user.entity';
import { UserRepository } from '../repositories/user.repository';

type IUserCreate = Omit<User, 'id' | 'createdAt'>;

@Injectable()
export class UserService {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly passwordUtil: PasswordUtil,
    ) {}

    async createUser(userData: IUserCreate): Promise<User> {
        if (
            !userData.firstName ||
            !userData.lastName ||
            !userData.email ||
            !userData.password
        ) {
            throw new HttpException('All fields must be filled', 400);
        }

        const userByEmail = this.userRepository.findByEmail(userData.email);

        if (userByEmail) {
            throw new HttpException('Email already in use', 400);
        }

        const passwordHash = await this.passwordUtil.generatePasswordHash(
            userData.password,
        );

        userData.password = passwordHash;

        const user = this.userRepository.create(userData);

        return user;
    }

    findUsers(): User[] {
        const users = this.userRepository.find();

        return users;
    }

    findUser(id: string): User {
        return this.userRepository.findById(id);
    }
}
