import { HttpException, Injectable } from '@nestjs/common';
import { PasswordUtil } from '@/utils/password.util';
import { Customer } from '@/entities/customer.entity';
import { CustomerRepository } from '@/repositories/customer.repository';

type ICustomerCreate = Omit<Customer, 'id' | 'createdAt'>;

@Injectable()
export class CustomerService {
    constructor(
        private readonly customerRepository: CustomerRepository,
        private readonly passwordUtil: PasswordUtil,
    ) {}

    async createCustomer(customerData: ICustomerCreate): Promise<Customer> {
        if (
            !customerData.firstName ||
            !customerData.lastName ||
            !customerData.email ||
            !customerData.password
        ) {
            throw new HttpException('All fields must be filled', 400);
        }

        const customerByEmail = this.customerRepository.findByEmail(
            customerData.email,
        );

        if (customerByEmail) {
            throw new HttpException('Email already in use', 400);
        }

        const passwordHash = await this.passwordUtil.generatePasswordHash(
            customerData.password,
        );

        customerData.password = passwordHash;

        const customer = this.customerRepository.create(customerData);

        return customer;
    }

    findCustomers(): Customer[] {
        const customers = this.customerRepository.find();

        return customers;
    }

    findOneCustomer(id: string): Customer {
        return this.customerRepository.findById(id);
    }
}
