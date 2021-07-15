import { Injectable } from '@nestjs/common';
import { Customer } from '../entities/customer.entity';

type ICustomerCreate = Omit<Customer, 'id' | 'createdAt'>;

@Injectable()
export class CustomerRepository {
    customers: Customer[];

    constructor() {
        this.customers = [];
    }

    create(customerData: ICustomerCreate): Customer {
        const customer = new Customer(customerData);

        this.customers.push(customer);

        return customer;
    }

    find(): Customer[] {
        return this.customers;
    }

    findById(id: string): Customer {
        return this.customers.find((customer) => customer.id === id);
    }

    findByEmail(email: string): Customer {
        console.log(this.customers);
        return this.customers.find((customer) => customer.email === email);
    }
}
