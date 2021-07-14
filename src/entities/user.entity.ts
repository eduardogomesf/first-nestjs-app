import { v4 as uuid } from 'uuid';

interface IUser {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export class User {
    id: string;

    firstName: string;

    lastName: string;

    email: string;

    password: string;

    createdAt: Date;

    constructor(user: IUser) {
        this.id = uuid();
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.email = user.email;
        this.password = user.password;
        this.createdAt = new Date();
    }
}
