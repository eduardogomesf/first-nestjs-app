import { Post } from '@nestjs/common';
import { Body, Controller } from '@nestjs/common';
import {
    SessionService,
    ISuccessfulCustomerSignIn,
} from 'src/services/session.service';

interface ISignInPayload {
    email: string;
    password: string;
}

@Controller('sign-in')
export class SessionController {
    constructor(private readonly sessionService: SessionService) {}

    @Post('customers')
    async signInCustomer(
        @Body() { email, password }: ISignInPayload,
    ): Promise<ISuccessfulCustomerSignIn> {
        return await this.sessionService.signInCustomer({ email, password });
    }
}
