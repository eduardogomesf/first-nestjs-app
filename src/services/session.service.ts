import { HttpException, Injectable } from '@nestjs/common';
import { CustomerRepository } from 'src/repositories/customer.repository';
import { AuthTokenUtil } from 'src/utils/authToken.util';
import { CUSTOM_ERRORS } from 'src/utils/constants';
import { PasswordUtil } from 'src/utils/password.util';

interface ICustomerSignIn {
    email: string;
    password: string;
}

export interface ISuccessfulCustomerSignIn {
    token: string;
    user: {
        id: string;
        email: string;
    };
}

@Injectable()
export class SessionService {
    constructor(
        private readonly customerRepository: CustomerRepository,
        private readonly authTokenUtil: AuthTokenUtil,
        private readonly passwordUtil: PasswordUtil,
    ) {}

    async signInCustomer({
        email,
        password,
    }: ICustomerSignIn): Promise<ISuccessfulCustomerSignIn> {
        if (!email || !password) {
            throw new HttpException(
                CUSTOM_ERRORS.missingSignInCredentials,
                400,
            );
        }

        console.log(email);

        const customer = this.customerRepository.findByEmail(email);

        console.log(customer);

        if (!customer) {
            console.log('here');
            throw new HttpException(CUSTOM_ERRORS.wrongSignInCredentials, 401);
        }

        const isPasswordValid = await this.passwordUtil.comparePasswordHash(
            password,
            customer.password,
        );

        if (!isPasswordValid) {
            throw new HttpException(CUSTOM_ERRORS.wrongSignInCredentials, 401);
        }

        const token = this.authTokenUtil.generateAuthToken({ id: customer.id });

        return {
            token,
            user: {
                id: customer.id,
                email: customer.email,
            },
        };
    }
}
