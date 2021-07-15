import { Module } from '@nestjs/common';
import { SessionController } from 'src/controllers/session.controller';
import { CustomerRepository } from 'src/repositories/customer.repository';
import { SessionService } from 'src/services/session.service';
import { AuthTokenUtil } from 'src/utils/authToken.util';
import { PasswordUtil } from 'src/utils/password.util';

@Module({
    imports: [],
    controllers: [SessionController],
    providers: [
        SessionService,
        CustomerRepository,
        AuthTokenUtil,
        PasswordUtil,
    ],
})
export class SessionModule {}
