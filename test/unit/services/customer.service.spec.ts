import { Test, TestingModule } from '@nestjs/testing';
import { CustomerRepository } from '@/repositories/customer.repository';
import { CustomerService } from '@/services/customer.service';
import { PasswordUtil } from '@/utils/password.util';
import {
    createNewCustomerMock,
    createCustomerMock,
} from './mocks/customer.mock';
import { Customer } from '@/entities/customer.entity';

describe('Customer', () => {
    let customerService: CustomerService;
    let customerRepository: CustomerRepository;
    let customerMockData: Customer;
    let newCustomerMockData;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            providers: [CustomerService, CustomerRepository, PasswordUtil],
        }).compile();

        customerService = await module.resolve(CustomerService);
        customerRepository = module.get('CustomerRepository');

        newCustomerMockData = createNewCustomerMock();
        customerMockData = createCustomerMock();
    });

    it('should be registered', () => {
        expect(customerService).toBeDefined();
        expect(customerRepository).toBeDefined();
    });

    it('should not be able to create a new customer if one of the required properties is missing', () => {
        expect(async () => {
            await customerService.createCustomer({
                firstName: '',
                lastName: '',
                email: '',
                password: '',
            });
        }).rejects.toThrow('All fields must be filled');
    });

    it('should be able to create a new customer', async () => {
        const findByEmailSpy = jest
            .spyOn(customerRepository, 'findByEmail')
            .mockImplementation(() => null);

        jest.spyOn(customerRepository, 'create').mockImplementation(
            () => customerMockData,
        );

        const customer = await customerService.createCustomer(
            newCustomerMockData,
        );

        expect(customer).toBeDefined();
        expect(findByEmailSpy).toBeCalledWith(newCustomerMockData.email);
        expect(customer.id).toBe(customerMockData.id);
        expect(customer.firstName).toBe(newCustomerMockData.firstName);
        expect(customer.lastName).toBe(newCustomerMockData.lastName);
        expect(customer.email).toBe(newCustomerMockData.email);
    });

    it('should not be able to create a new customer with an e-mail that is already in use', async () => {
        jest.spyOn(customerRepository, 'findByEmail').mockImplementation(
            () => customerMockData,
        );

        expect(async () => {
            await customerService.createCustomer(newCustomerMockData);
        }).rejects.toThrow('Email already in use');
    });

    it('should be able to find a list of customers', () => {
        jest.spyOn(customerRepository, 'find').mockImplementation(() => [
            customerMockData,
        ]);

        const customers = customerService.findCustomers();

        expect(customers).toStrictEqual([customerMockData]);
    });

    it('should be able to find one customer by id', () => {
        jest.spyOn(customerRepository, 'findById').mockImplementation(
            () => customerMockData,
        );

        const customer = customerService.findOneCustomer(customerMockData.id);

        expect(customer).toStrictEqual(customerMockData);
    });
});
