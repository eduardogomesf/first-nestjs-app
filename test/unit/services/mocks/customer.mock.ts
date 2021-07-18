const createNewCustomerMock = () => {
    return {
        firstName: 'Testing',
        lastName: 'User',
        email: 'testing@nestjs.com',
        password: 'mytestpassword',
    };
};

const createCustomerMock = () => {
    const customer = createNewCustomerMock();

    return {
        id: 'a03fe665-e3e3-4ed9-b52a-5fc996e28484',
        firstName: customer.firstName,
        lastName: customer.lastName,
        email: customer.email,
        password:
            '$2b$04$lZEqVXTPdyaHouVObReehO/Wb3TX4Ha0ZiJvB2QcB6TMluCdg2EaW',
        createdAt: new Date('2021-07-15T23:41:47.460Z'),
    };
};

export { createNewCustomerMock, createCustomerMock };
