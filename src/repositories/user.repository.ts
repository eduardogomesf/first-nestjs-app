import { Injectable } from '@nestjs/common';
import { User } from '../entities/user.entity';

type IUserCreate = Omit<User, 'id' | 'createdAt'>;

@Injectable()
export class UserRepository {
    users: User[];

    constructor() {
        this.users = [];
    }

    create(userData: IUserCreate): User {
        const user = new User(userData);

        this.users.push(user);

        return user;
    }

    find(): User[] {
        return this.users;
    }

    findById(id: string): User {
        return this.users.find((user) => user.id === id);
    }

    findByEmail(email: string): User {
        return this.users.find((user) => user.email === email);
    }
}
