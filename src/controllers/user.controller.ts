import { Param } from '@nestjs/common';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { UserService } from '../services/user.service';

interface IUserDTO {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    findAll(): User[] {
        return this.userService.findUsers();
    }

    @Post()
    async create(@Body() user: IUserDTO): Promise<User> {
        return await this.userService.createUser(user);
    }

    @Get(':id')
    findOne(@Param('id') id: string): User {
        return this.userService.findUser(id);
    }
}
