import { Module } from '@nestjs/common';
import { PasswordUtil } from 'src/utils/password.util';
import { UserController } from '../controllers/user.controller';
import { UserRepository } from '../repositories/user.repository';
import { UserService } from '../services/user.service';

@Module({
    imports: [],
    controllers: [UserController],
    providers: [UserService, UserRepository, PasswordUtil],
})
export class UserModule {}
