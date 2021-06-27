import { Body, Controller, Get, Post } from '@nestjs/common';
import { User } from './user';
import { UserService } from './user.service';

interface IUser {
  firstName: string;
  lastName: string;
  age: number;
}

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll(): User[] {
    return this.userService.findUsers();
  }

  @Post()
  create(@Body() user: IUser): User {
    return this.userService.createUser(user);
  }
}
