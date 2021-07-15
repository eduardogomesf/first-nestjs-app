import { Module } from '@nestjs/common';
import { PasswordUtil } from 'src/utils/password.util';
import { CustomerController } from '../controllers/customer.controller';
import { CustomerRepository } from '../repositories/customer.repository';
import { CustomerService } from '../services/customer.service';

@Module({
    imports: [],
    controllers: [CustomerController],
    providers: [CustomerService, CustomerRepository, PasswordUtil],
})
export class CustomerModule {}
