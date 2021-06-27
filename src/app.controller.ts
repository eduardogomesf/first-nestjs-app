import { Body, Controller, Get, Post } from '@nestjs/common';

interface IUser {
  firstName: string;
  lastName: string;
  age: number;
}

@Controller('users')
export class AppController {
  users: IUser[];

  constructor() {
    this.users = [];
  }

  @Get()
  findAll(): IUser[] {
    return this.users;
  }

  @Post()
  create(@Body() user: IUser): IUser {
    this.users.push(user);

    return user;
  }
}
