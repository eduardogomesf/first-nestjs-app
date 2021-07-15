import { Module } from '@nestjs/common';
import { SessionController } from 'src/controllers/session.controller';
import { SessionService } from 'src/services/session.service';
import { AuthTokenUtil } from 'src/utils/authToken.util';
import { PasswordUtil } from 'src/utils/password.util';
import { CustomerModule } from './customer.module';

@Module({
    imports: [CustomerModule],
    controllers: [SessionController],
    providers: [SessionService, AuthTokenUtil, PasswordUtil],
})
export class SessionModule {}
