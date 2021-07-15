import { Param } from '@nestjs/common';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { Customer } from '../entities/customer.entity';
import { CustomerService } from '../services/customer.service';

interface ICustomerDTO {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

@Controller('customers')
export class CustomerController {
    constructor(private readonly customerService: CustomerService) {}

    @Get()
    findAll(): Customer[] {
        return this.customerService.findCustomers();
    }

    @Post()
    async create(@Body() customer: ICustomerDTO): Promise<Customer> {
        return await this.customerService.createCustomer(customer);
    }

    @Get(':id')
    findOne(@Param('id') id: string): Customer {
        return this.customerService.findOneCustomer(id);
    }
}
