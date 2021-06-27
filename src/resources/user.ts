import { v4 as uuid } from 'uuid';

interface IUser {
  firstName: string;
  lastName: string;
  age: number;
}

export class User {
  id: string;

  firstName: string;

  lastName: string;

  age: number;

  createdAt: Date;

  constructor(user: IUser) {
    this.id = uuid();
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.age = user.age;
    this.createdAt = new Date();
  }
}
